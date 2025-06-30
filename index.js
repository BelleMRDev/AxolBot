const fs = require('fs');
const { launchmode } = require('./config.json');

if (launchmode === '0') {
	require('./bot.js');
	console.log("Starting: Axol [Revolt Bot]");
}
else if (launchmode === '1') {
	require('./botdiscord.js');
	console.log("Starting: Axol [Discord Bot]");
}
else if (launchmode === '2') {
	require('./bot.js');
	require('./webserver.js');
	console.log("Starting: Axol [Revolt Bot] + [Webserver]");
}
else if (launchmode === '3') {
	require('./bot.js');
	require('./botdiscord.js');
	console.log("Starting: Axol [Revolt Bot] + Axol [Discord Bot]");
}
else if (launchmode === '4') {
	require('./bot.js');
	require('./botdiscord.js');
	require('./webserver.js');
	console.log("Starting: Axol [Revolt Bot] + Axol [Discord Bot] + [Webserver]");
}
else {
	console.log("ERROR: INVALID VALUE.")
	console.log("Please edit the launchmode value in the config.json file. Here are the available values")
	console.log("0) Revolt.chat Bot Only")
	console.log("1) Discord Bot Only")
	console.log("2) Revolt.chat Bot and Webserver")
	console.log("3) Revolt.chat Bot and Discord bot")
	console.log("4) Revolt.chat Bot and Discord Bot and Webserver")
}