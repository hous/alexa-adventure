// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var CONFIG = require('config');
var NumberToText = require('NumberToText');
var APP_ID = CONFIG.amazonAppId;

var game = {};
game.data = require('data');
game.currentScene = 0;

var debugMode = true;
debugMode = !debugMode;

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Game = function () {
		AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Game.prototype = Object.create(AlexaSkill.prototype);
Game.prototype.constructor = Game;

Game.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
		console.log("Game onSessionStarted requestId: " + sessionStartedRequest.requestId
				+ ", sessionId: " + session.sessionId);
		// any initialization logic goes here
};

Game.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
	console.log("Game onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
	handleSessionStartIntent(session, response);
};

Game.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
		console.log("Game onSessionEnded requestId: " + sessionEndedRequest.requestId
				+ ", sessionId: " + session.sessionId);
		// any cleanup logic goes here
};

Game.prototype.intentHandlers = {
		// register custom intent handlers
	SessionStartIntent: function (intent, session, response) {
		handleSessionStartIntent(session, response);
	},
	GameStartIntent: function (intent, session, response) {
		handleGameStartIntent(intent, session, response);
	},
	GameActionIntent: function (intent, session, response) {
		handleGameActionIntent(intent, session, response);
	},
	SceneZeroIntent: function (intent, session, response) {
		handleSceneZeroIntent(intent, session, response);
	},
	QuitIntent: function (intent, session, response) {
		handleQuitIntent(intent, session, response);
	},
	HelpIntent: function (intent, session, response) {
		handleHelpIntent(session, response);
	}
};

function handleSessionStartIntent(session, response) {
	var speechOutput = game.data.introduction.description;
	var repromptSpeech = game.data.introduction.reprompt;
	response.ask(speechOutput, repromptSpeech);
};

function handleGameStartIntent(intent, session, response) {
	debug(intent, session, response);
	var speechOutput = game.data.scenes[0].description;
	var repromptSpeech = getReprompt();
	if (debugMode) {
//		debug(intent, session, response);
		speechOutput = "Introduction Speech";
	}
	response.ask(speechOutput, repromptSpeech);
}

function handleGameActionIntent(intent, session, response) {
	debug(intent, session, response);
	try {
		if (game.data.scenes[game.currentScene].commands.indexOf(intent.slots.Command)){
			game.currentScene++;
		}
	} catch(e) {};

	var speechOutput = game.data.scenes[game.currentScene].description;
	var repromptSpeech = getReprompt();

	if (debugMode) {
//		debug(intent, session, response);
		speechOutput = "Scene " + numberToText(game.currentScene) + " speech.";
	}
	response.ask(speechOutput, repromptSpeech);
}

function handleSceneZeroIntent(intent, session, response) {
	game.currentScene = 1;
	handleGameActionIntent(intent, session, response);
}

function handleHelpIntent(intent, session, response) {
	debug(intent, session, response);
	var speechOutput = "You are playing Future. " +
		"Future is an interactive Game that you can navigate with your voice. " +
		"Depending on where you are in the Game you can say many different things to interact with the world. ";
	var repromptSpeech = "What do you want to do?";
	if (debugMode) {
//		debug(intent, session, response);
	}
	response.ask(speechOutput, repromptSpeech);
}

function handleQuitIntent(intent, session, response) {
	var speechOutput = "Thank you for playing Future.";
	response.tell(speechOutput);
}

function debug(intent, session, response) {
	console.log("*************************");
	console.log("INTENT");
	console.log(intent);
	console.log("SESSION");
	console.log(session);
	console.log("RESPONSE");
	console.log(response);
}

function getReprompt() {
	return game.data.reprompts[Math.floor(Math.random()*game.data.reprompts.length)];
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
		// Create an instance of the Game skill.
		var newGame = new Game();
		newGame.execute(event, context);
};
