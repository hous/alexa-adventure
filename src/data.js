module.exports = {
	reprompts : [
		"What do you like Siren to do?",
		"Tell Siren to do something.",
		"Try telling Siren to do something."
	],
	introduction : {
		description : "Welcome to Future. " +
			"Future is an interactive Game that you can navigate with your voice. " +
			"The protagonist of Future is an young girl named Siren, and you play the role of her imaginary friend, Jason. " +
			"Depending on the situation, you can tell Siren to do different things to interact with the world. " +
			"For example, you can say things like 'Tell Siren to stand up.' or 'Tell Siren to open the door.' " +
			"If you're ready to play Future, please say let's begin. ",
		reprompt : "If you're ready to play Future, please say 'let's begin'. "
	},
	scenes : [
		{
			scene : 0,
			description : "Siren wakes up in a bed that's way too big for her. She stretches, looks at you, and says 'Good morning Jason.'",
			reprompt : "Siren looks at you impatiently and says 'I SAID, good morning Jason."
		},
		{
			scene : 1,
			description : "Siren smiles appreciatively then ambles over to the side of the bed. She dangles her legs over the side and looks down warily.",
			reprompt : "Siren looks at you with fear in her eyes, then looks down at the ground.",
			commands : [
				"get out of bed",
				"jump down from the bed",
				"jump down"
			]
		},
		{
			scene : 2,
			description : "Siren musters her courage and jumps down from the bed.",
			reprompt : "Siren looks at you with a tinge of fear in her eyes."
		}
	]
}

/*
 module.exports = {
 introduction : {
 description : "Welcome to Future. " +
 "Future is an interactive Game that you can navigate with your voice. " +
 "The protagonist of Future is an astronaut named Siren, and you play the role of the artificial intelligence that is guiding her." +
 "Depending on the situation, you can tell Siren to do different things to interact with the world. " +
 "For example, you can say things like 'Tell Siren to stand up.' or 'Tell Siren to open the door.'" +
 "If you're ready to play Future, please say 'play future'. ",
 reprompt : "If you're ready to play Future, please say 'play future'. "
 },
 levels : {
 level0 : {
 description : "Siren wakes up .",
 trigger : ""
 },
 level1 : {
 description : "in a white room. Without curtains."
 }
 }
 }

*/