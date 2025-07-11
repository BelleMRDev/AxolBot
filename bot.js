const { Client } = require("revolt.js");
const fs = require('fs');
const { revoltbottoken, revoltbotprefix } = require('./config.json');
const { MessageEmbed } = require('revolt.js');
const AxolVer = require('./package.json');
const os = require("os");
const translate = require('@iamtraction/google-translate');

let client = new Client();
const token = revoltbottoken;
const prefix = revoltbotprefix;

client.on("ready", async () => {
	console.info(`${client.user.username} Revolt Bot - ONLINE! - Made by AXOL#6594 on Revolt.chat`);
});

let commands = JSON.parse(fs.readFileSync('ccommands.json', 'utf8'));

const dicenum = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6"
];




client.on("message", async (message) => {
	if (message.author?. bot) return;
	if (message.content === prefix + "help") {
		message.channel.sendMessage(`Commands for ${client.user.username}\n\n${prefix}help\n${prefix}ping\n${prefix}botinfo\n${prefix}dice\n${prefix}say\n${prefix}esay\n${prefix}translate\n${prefix}serverinfo\n${prefix}purge\n${prefix}nick\n${prefix}kick\n${prefix}ban\n${prefix}unban\n${prefix}rolecolor\n${prefix}addcmd\n${prefix}deletecmd\n${prefix}listcmds\n${prefix}resetccmds`);
	}
});

client.on("message", async (message) => {
	if (message.content === prefix + "ping") {
		let now = Date.now();
		message.channel.sendMessage(`Checking ping....`).then((msg) => {
			msg.edit({ content: `Bot Latency: ${Date.now() - now}ms\nAPI Latency: ${Math.round(client.websocket.ping)}ms`})
		});
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
	if (message.content === prefix + "botinfo") {
		function uptime() {
			const uptime = process.uptime();
			const hours = Math.floor(uptime / 3600);
			const minutes = Math.floor((uptime % 3600) / 60);
			const seconds = Math.floor(uptime % 60);
			return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
		}
		const embed = { title: `Information about ${client.user.username}`, description: `Bot Username: ${client.user.username}\nServers Im in: ${client.servers.size}\nBot Version: ${AxolVer.version}\nNode.JS version: ${process.version}\nRevolt.JS version: ${require("revolt.js").LIBRARY_VERSION}\nMy Uptime: ${uptime()}\nMachine: ${os.machine()}\nMemory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nInvite Me: https://app.revolt.chat/bot/${client.user._id}\nSource code: https://gitlab.com/bellemr/axolbot` }
		message.channel.sendMessage({ embeds: [embed] });
    }
});

client.on('message', async (message) => {
	if (message.content === prefix + "dice") {
		const diceResult = dicenum[Math.floor(Math.random() * dicenum.length)];
		message.channel.sendMessage(`You rolled a ${diceResult}`);
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
	if (typeof message.content != "string") return;
	if (message.content.startsWith(prefix + "say")) {
		const words = message.content.split(" ");
		words.shift();
		const toSay = words.join(" ");
		if(!toSay) return message.channel.sendMessage("What do you want me to say?");
			
		const blockedwords = fs.readFileSync('blockedwords.txt', 'utf-8').split('\n').map(word => word.trim());
		const containsWord = words.some(arg => blockedwords.includes(arg.toLowerCase()));
		if (containsWord) {return message.reply('I will not say any words or phrases related to illegal content, scamming, or racism');}
		
		message.channel.sendMessage(toSay);
    }
});

client.on("message", async (message) => {
    if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "esay")) {
        const words = message.content.split(" ");
        words.shift();
		let embedColor = message.content.split(' ')[1];
		if(!embedColor) return message.channel.sendMessage("What should the hexadecimal color be for the embed?");
        let toSay = message.content.split(' ')[2];
        if(!toSay) return message.channel.sendMessage("What do you want me to say?");
		const hexRegex = /^#?([0-9A-Fa-f]{6})$/;
		if (!hexRegex.test(embedColor)) {return message.channel.sendMessage("Invalid hexadecimal color! You can visit <https://www.mathsisfun.com/hexadecimal-decimal-colors.html> for a Decimal to Hexadecimal conversion (e.g., FFFFFF).")};
		const blockedwords = fs.readFileSync('blockedwords.txt', 'utf-8').split('\n').map(word => word.trim());
		const containsWord = words.some(arg => blockedwords.includes(arg.toLowerCase()));
		const embed = { colour: `#${embedColor}`, description: `${toSay}` }
        message.channel.sendMessage({ embeds: [embed] });
    }
});

client.on("message", async (message) => {
    if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "translate")) {
        const words = message.content.split(" ");
        words.shift();
		let lang = message.content.split(' ')[1];
        let text = message.content.split(' ')[2];
		
		if (!lang || !text) {
			message.channel.sendMessage(`What is the language and text you want me to translate to: ${prefix}translate <lang> <text>`);
		}

		try {
			const result = await translate(text, { to: lang });
			const embed = { title: 'Translator', description: `Translated to: ${lang}\n\nOriginal Text: ${text}\n\nTranslated Text: ${result.text}` }
			message.channel.sendMessage({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			message.channel.sendMessage('Something went wrong while trying to translate the text. If this continues to happen, contact the bot owner');
		}
    }
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (message.content === prefix + "serverinfo") {
		const s = message.channel.server;    
		const memberCount = await s.fetchMembers();
		const embed = { title: `Information about ${s.name}`, description: `Server ID: ${s._id}\nMember Count: ${memberCount.members.length}\nServer Owner: <@${s.owner}> (${s.owner})\nServer Discoverable?: ${s.discoverable}\n\nServer Description:  ${s.description}` }
		message.channel.sendMessage({ embeds: [embed] });
    }
});




	
let words = [
	'help',
	'ping',
	'botinfo',
	'dice',
	'say',
	'esay',
	'translate',
	'serverinfo',
	'addcmd',
	'deletecmd',
	'listcmds',
	'resetccmds',
	'nick',
	'purge',
	'kick',
	'ban',
	'unban',
	'rolecolor',
	'socialmedia'
].map(word => word.trim().toLowerCase());

client.on('message', async (message) => {
	if (message.author?. bot) return;
	if (typeof message.content != "string") return;
	const serverId = message.channel.server_id;
	const content = message.content.trim();
	
	const placeholders = {
		'{server_name}': message.channel.server.name,
		'{server_id}': message.channel.server._id,
		'{server_owner}': message.channel.server.owner,
		'{author_id}': message.author_id,
		'{author_name}': message.author_username
	};
	const replacePlaceholders = (text) => {
		let newText = text;
		for (const placeholder in placeholders) {
			newText = newText.replace(new RegExp(escapeRegExp(placeholder), 'g'), placeholders[placeholder]);
		}
		return newText;
	};
	function escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the matched substring
	}
	
	if (message.content.startsWith(prefix)) {
		const [command, ...args] = content.slice(prefix.length).trim().split(/\s+/);
		if (commands[serverId] && commands[serverId][command]) {
			let response = commands[serverId][command];
			response = replacePlaceholders(response);
			if (response.startsWith('embed:')) {
				const embedresponse = response.slice(6).trim();
				const embed = { description: `${embedresponse}` }
				message.channel.sendMessage({ embeds: [embed] });
			} else if (response.startsWith('reply:')){
				const replyresponse = response.slice(6).trim();
				message.reply(replyresponse);
			} else if (response.startsWith('nsfw:')){
				if (!message.channel.nsfw) return message.channel.sendMessage("This custom command requires the use of a NSFW marked channel");
				const replyresponse = response.slice(6).trim();
				message.channel.sendMessage(replyresponse);
			} else if (response.startsWith('admin:')){
				if (message.member.hasPermission(message.channel.server, "ManageServer") === false) {
					return message.channel.sendMessage("You are missing the following permission to use this command: ManageServer");
				}
				const replyresponse = response.slice(6).trim();
				message.channel.sendMessage(replyresponse);
			} else {
				message.channel.sendMessage(response);
			}
			return;
		}
	}
	if (message.content.startsWith(prefix + "addcmd")) {
		if (message.member.hasPermission(message.channel.server, "ManageServer") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: ManageServer");
		}
		const args = content.split(' ').slice(1);
		const [commandName, ...response] = args;
		const commandResponse = response.join(' ').replace(/\\n/g, '\n');
			
		const blockedwords = fs.readFileSync('blockedwords.txt', 'utf-8').split('\n').map(word => word.trim());
		const containsWord = args.some(arg => blockedwords.includes(arg.toLowerCase()));
		if (containsWord) {return message.reply('Please do not create commands that includes words or phrases related to illegal content, scamming, or racism');}
		
		if (!commands[serverId]) {
			commands[serverId] = {};
		}
		
		if (words.includes(commandName)) {return message.reply(`${commandName} is one of my built in commands. Therefore, I will not create a command with this command name.`)};

		if (commands[serverId][commandName]) {
			message.reply(`The command "${commandName}" already exists!`);
			return;
		}
		commands[serverId][commandName] = commandResponse;
		fs.writeFileSync('ccommands.json', JSON.stringify(commands, null, 2));
		message.reply(`Command "${commandName}" added successfully!`);
	}
	if (message.content.startsWith(prefix + "deletecmd")) {
		if (message.member.hasPermission(message.channel.server, "ManageServer") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: ManageServer");
		}
		const args = content.split(' ').slice(1);
		const commandName = args[0];
		if (commands[serverId] && commands[serverId][commandName]) {
			delete commands[serverId][commandName];
			fs.writeFileSync('ccommands.json', JSON.stringify(commands, null, 2));
			message.reply(`Command "${commandName}" deleted successfully!`);
		} else {
			message.reply(`Command "${commandName}" not found.`);
		}
	}
	if (message.content === prefix + "listcmds") {
		if (commands[serverId] && Object.keys(commands[serverId]).length > 0) {
			const commandList = Object.keys(commands[serverId]).join(', ');
			return message.reply(`Here are the custom commands for this server:\n${commandList}`);
		} else {
			return message.reply("There are no custom commands created for this server.");
		}
	}
	if (message.content === prefix + "resetccmds") {
		if (message.member.hasPermission(message.channel.server, "ManageServer") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: ManageServer");
		}
		if (commands[serverId]) {
			delete commands[serverId];
			fs.writeFileSync('ccommands.json', JSON.stringify(commands, null, 2));
			message.reply("All custom commands for this server has been removed.");
		} else {
			message.reply("There are no custom commands to remove for this server.");
		}
	}
});





client.on("message", async (message) => {
	if (message.author?. bot) return;
	if (typeof message.content != "string") return;
	if (message.content.startsWith(prefix + "nick")) {
		let target_id = message.content.split(' ')[1];
		let newnickname = message.content.split(' ')[2];
		if (message.member.hasPermission(message.channel.server, "KickMembers") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: KickMembers");
		}
		let member = message.channel.server.fetchMember(target_id)
		try{
			(await member).edit({nickname: newnickname}).then(e => {message.reply(`${target_id} nickname has been changed to: **${newnickname}** by <@${message.author_id}>`);})
		}catch{
			message.channel.sendMessage("Failed to change nickname.")
		}
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
	if (typeof message.content != "string") return;
	if (message.content.startsWith(prefix + "purge")) {
		const messageArgs = message.content.split(" ")
		if (message.member.hasPermission(message.channel.server, "ManageMessages") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: ManageMessages");
		}
		if(!messageArgs[1]) return message.channel.sendMessage("Please specify an amount of messages to purge. (Max: 100)")
		if(+messageArgs[1] > 100) return message.channel.sendMessage("Maximum message to purge is 100")

		try{
			(await message.channel.fetchMessages({ limit: +messageArgs[1] })).forEach((message)=>message.delete())
		}catch{
			message.channel.sendMessage("Failed to purge messages.")
		}
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "kick")) {
		if (message.member.hasPermission(message.channel.server, "KickMembers") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: KickMembers");
		}
		let target_id = message.content.split(' ')[1];
		let reason = message.content.split(' ')[2];
		let target = message.channel.server.fetchMember(target_id);
		try {
			if ((await target).kickable !== true) {
				message.channel.sendMessage("I can't kick this user. This may be because the user you are trying to kick has a role equal or higher then my highest role");
			}
			if ((await target).kickable === true) {
				(await target).kick();
				message.channel.sendMessage(`<@${target_id}> has been kicked by <@${message.author_id}> for **${reason}**`);
			}
		} catch (error) {
			message.channel.sendMessage(`${error}`)
		}
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "ban")) {
		if (message.member.hasPermission(message.channel.server, "BanMembers") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: BanMembers");
		}
		let target_id = message.content.split(' ')[1];
		let reason = message.content.split(' ')[2];
		let target = message.channel.server.fetchMember(target_id);
		try {
			if ((await target).bannable !== true) {
				message.channel.sendMessage("I can't ban this user. This may be because the user you are trying to ban has a role equal or higher then my highest role");
			}
			if ((await target).bannable === true) {
				await message.channel.server.banUser(target_id, { reason: reason })
				message.channel.sendMessage(`<@${target_id}> has been banned by <@${message.author_id}> for **${reason}**`);
			}
		} catch (error) {
			message.channel.sendMessage(`${error}`)
		}
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "unban")) {
		if (message.member.hasPermission(message.channel.server, "BanMembers") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: BanMembers");
		}
		let target_id = message.content.split(' ')[1];
		if (!await (await message.channel.server.fetchBans()).bans.find(b => b._id.user === target_id)) {
			message.channel.sendMessage(`<@${target_id}> is currently not banned from the server.`);
		}
		if (await (await message.channel.server.fetchBans()).bans.find(b => b._id.user === target_id)) {
			message.channel.server.unbanUser(target_id);
			message.channel.sendMessage(`<@${target_id}> has been unbanned by <@${message.author_id}>.`);
		}
	}
});

client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (typeof message.content != "string") return;
    if (message.content.startsWith(prefix + "rolecolor")) {
		if (message.member.hasPermission(message.channel.server, "ManageRole") === false) {
			return message.channel.sendMessage("You are missing the following permission to use this command: ManageRole");
		}
		let role_id = message.content.split(' ')[1];
		let colorarg = message.content.split(' ')[2];
		try {
			const changedRoleColor = await message.channel.server.editRole(role_id, {colour: `${colorarg}`});
			message.channel.sendMessage(`"${changedRoleColor.name}"'s role color has been changed to ${changedRoleColor.colour}`);
		} catch (error) {
			console.log(`Error: ${error}`)
			message.channel.sendMessage(`Error: ${error}`)
		}
	}
});





client.on("message", async (message) => {
	if (message.author?. bot) return;
    if (message.content === prefix + "socialmedia") {
		const embed = { title: "Axol Software Social Media pages", description: "YouTube: https://www.youtube.com/channel/UCCYCRAt1srptO3dc7eeN4Yw \nX: https://x.com/BelleMRdev \nBluesky: https://bsky.app/profile/did:plc:jcoqzgcqgtye7vmjhbjszpfd \nGithub: https://github.com/BelleMetaRunnnerDev \nGitlab: https://gitlab.com/bellemr \nGamejolt: https://gamejolt.com/@BelleMetaRunner \nItch.io: https://bellemetarunner.itch.io \nRoblox Account: https://www.roblox.com/users/6002597529/profile" }
        message.channel.sendMessage({ embeds: [embed] });
    }
});





client.loginBot(token);