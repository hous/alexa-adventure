/**
 * Modified from https://medium.com/@AdamRNeary/a-gulp-workflow-for-amazon-lambda-61c2afd723b6
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var args   = require('yargs').argv;
var del = require('del');
var install = require('gulp-install');
var zip = require('gulp-zip');
var AWS = require('aws-sdk');
var fs = require('fs');
var runSequence = require('run-sequence');

var CONFIG = require('./src/config');

// First we need to clean out the dist folder and remove the compiled zip file.
gulp.task('clean', function(cb) {
	del('./dist/archive.zip', cb);
});

// Now the dist directory is ready to go. Zip it.
gulp.task('zip', function() {
	return gulp.src('src/*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('dist'));
});

// Per the gulp guidelines, we do not need a plugin for something that can be
// done easily with an existing node module. #CodeOverConfig
//
// Note: This presumes that AWS.config already has credentials. This will be
// the case if you have installed and configured the AWS CLI.
//
// See http://aws.amazon.com/sdk-for-node-js/
gulp.task('upload', function() {

	// TODO: This should probably pull from package.json
	AWS.config.region = 'us-east-1';
	var lambda = new AWS.Lambda();
	var functionName = CONFIG.lambdaFunctionName;

	lambda.getFunction({FunctionName: functionName}, function(err, data) {
		if (err) {
			if (err.statusCode === 404) {
				console.log(err);
				var warning = 'Unable to find lambda function ' + deploy_function + '. '
				warning += 'Verify the lambda function name and AWS region are correct.'
				gutil.log(warning);
			} else {
				var warning = 'AWS API request failed. '
				warning += 'Check your AWS credentials and permissions.'
				gutil.log(warning);
			}
		}

		var current = data.Configuration;
		var params = {
			FunctionName: functionName,
		};

		fs.readFile('dist/archive.zip', function(err, data) {
			params['ZipFile'] = data;
			lambda.updateFunctionCode(params, function(err, data) {
				if (err) {
					console.log(err);
					console.log(data);
					var warning = 'Package upload failed. '
					warning += 'Check your iam:PassRole permissions.'
					gutil.log(warning);
				}
			});
		});
	});
});

//TODO - this should loop through test events or something.
gulp.task('test', function(callback) {
	var intent = args.intent || "launchRequest";
	AWS.config.region = 'us-east-1';
	var lambda = new AWS.Lambda();
	var payload = fs.readFileSync('test/events/' + intent + '.json', 'utf8');

	gutil.log("Testing with intent '" + gutil.colors.blue(gutil.colors.bold(intent)) + "'.");

	var params = {
		FunctionName : CONFIG.lambdaFunctionARN,
		Payload : payload
	};

	lambda.invoke(params, function(err,data){
		if (err) {
			var warning;
			if (err.statusCode === 404) {
				console.log(err);
				warning = 'Unable to find lambda function ' + deploy_function + '. ' +
					'Verify the lambda function name and AWS region are correct.';
				gutil.log(warning);
			} else {
				warning = 'AWS API request failed. ' +
					'Check your AWS credentials and permissions.';
				gutil.log(warning);
			}
		}

		console.log("The data is:");
		console.log(data);
		if (data.StatusCode !== 200) {
			console.warn("The intent failed. Please check logs.");
		}
	});
});

// The key to deploying as a single command is to manage the sequence of events.
gulp.task('publish', function(callback) {
	return runSequence(
		['clean'],
		['zip'],
		['upload'],
		callback
	);
});