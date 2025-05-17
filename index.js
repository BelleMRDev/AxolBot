const fs = require('fs');
const { launchmode } = require('./config.json');

if (launchmode === '0') {
	require('./bot.js');
	console.log("Starting: Axol [Revolt Bot]");
}
else if (launchmode === '1') {
	require('./bot.js');
	require('./webserver.js');
	console.log("Starting: Axol [Revolt Bot] + [Webserver]");
}
else {
	console.log("ERROR: INVALID VALUE.")
	console.log("Please edit the launchmode value in the config.json file. Here are the available values")
	console.log("0) Revolt.chat Bot Only")
	console.log("1) Revolt.chat Bot and Webserver")
}