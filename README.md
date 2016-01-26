Interactive Fiction POC for Amazon Alexa. Figure out if ZORK-style interactive fiction is usable and fun with a speech interface instead of text.
"Alexa, launch Future."

IntentSchema and SampleUtterances (speechAssets) must be updated in the Alexa console, while lambda functions (src) can be updated by using the gulp publish task. Gulp test first!

TODO:
- [ ] TellWithCard? Can you put images in cards? Should be secondary and not needed to play the game.
- [ ] If intent doesn't match the scene, disregard it
- [X] Can wait-times be increased before process is exited, or can that not be changed? No

Findings:
- Alexa'a pacing is difficult to control, easy to lose track of the narrative. Would keep attention better by playing pre-recorded clips from a narrator.
- In a game setting, user needs time to think about options, but there is an un-changeable time limit in waiting for responses, after which the game is exited automatically.
