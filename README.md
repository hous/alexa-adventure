Interactive Fiction POC for Amazon Alexa. Figure out if ZORK-style interactive fiction is usable and fun with a speech interface instead of text.
"Alexa, launch Future."

IntentSchema and SampleUtterances (speechAssets) must be updated in the Alexa console, while lambda functions (src) can be updated by using the gulp publish task. Gulp test first!

TODO:
- [ ] TellWithCard? Can you put images in cards? Should be secondary and not needed to play the game.
- [ ] If intent doesn't match the scene, disregard it
- [ ] Can wait-times be increased before process is exited, or can that not be changed?
