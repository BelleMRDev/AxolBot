const Discord = require('discord.js');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const { discordbottoken, discordbotprefix } = require('./config.json');
const path = require('path');
const fetch = require('node-fetch');
const BotVer = require('./package.json');
const os = require("os");
const translate = require('@iamtraction/google-translate');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	partials: [Partials.Channel]
});

const customCommandsPath = path.join(__dirname, 'ccommandsdiscord.json');
let customCommands = {};
if (fs.existsSync(customCommandsPath)) {
	customCommands = JSON.parse(fs.readFileSync(customCommandsPath, 'utf8'));
}
function saveCommands() {
	fs.writeFileSync(customCommandsPath, JSON.stringify(customCommands, null, 2));
}

const dicenum = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6"
];

client.on('ready', () => {
	console.log(`${client.user.tag} Discord Bot - ONLINE! - Made by axol.oti on Discord`);
});

function processResponse(template, message) {
	let owner = message.guild.members.fetch(message.guild.ownerId);
	const replacements = {
		'{server_name}': message.guild.name,
		'{server_id}': message.guild.id,
		'{server_mc}': message.guild.memberCount.toString(),
		'{server_owner}': owner.id,
		'{server_bc}': message.guild.premiumSubscriptionCount || '0',
		'{channel_name}': message.channel.name,
		'{author_id}': message.author.id,
		'{author_name}': message.author.username,
		'{author_tag}': message.author.tag
	};
	let result = template;
	for (const [key, value] of Object.entries(replacements)) {
		result = result.replace(new RegExp(key, 'g'), value);
	}
	result = result.replace(/@everyone/g, '[everyone]');
	result = result.replace(/@here/g, '[here]');
	result = result.replace(/<@&\d+>/g, '[RoleMention]');
	return result;
}

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	const prefix = discordbotprefix;
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/\s+/);
	const command = args.shift().toLowerCase();
	const guildId = message.guild.id;

	if (command === 'help') {
		const embed = new Discord.EmbedBuilder()
			.setTitle(`${client.user.tag}`)
			.setDescription(`${prefix}help\n${prefix}botinfo\n${prefix}dice\n${prefix}say\n${prefix}esay\n${prefix}translate\n${prefix}serverinfo\n${prefix}addcmd\n${prefix}delcmd\n${prefix}listcmds\n${prefix}resetccmds`)
		return message.channel.send({ embeds: [embed] });
	}
	if (command === 'botinfo') {
		const embed = new Discord.EmbedBuilder()
			.setTitle(`Information about ${client.user.tag}`)
			.setDescription(`Servers Im in: ${client.guilds.cache.size}\nBot Version: ${BotVer.version}\nNode.JS version: ${process.version}\nSource code: https://gitlab.com/bellemr/axolbot`)
		return message.channel.send({ embeds: [embed] });
	}
	if (command === 'dice') {
		const diceResult = dicenum[Math.floor(Math.random() * dicenum.length)];
		return message.reply(`You rolled a ${diceResult}`);
	}
	if (command === 'say') {
		const words = message.content.split(" ");
		words.shift();
		const toSay = words.join(" ");
		if (!toSay) {
			return message.reply('What do you want me to say?');
		}
		const response = processResponse(toSay, message);
		return message.channel.send(response);
	}
	if (command === 'esay') {
		const words = message.content.split(" ");
		words.shift();
		const toSay = words.join(" ");
		if (!toSay) {
			return message.reply('What do you want me to say?');
		}
		const embed = new Discord.EmbedBuilder()
			.setDescription(toSay)
		return message.channel.send({ embeds: [embed] });
	}
	if (command === 'translate') {
		if (!message.member.permissions.has('ManageGuild')) {
			return message.reply('You are missing the following permission to use this command: ManageGuild');
		}
		const words = message.content.split(" ");
        words.shift();
		let lang = message.content.split(' ')[1];
        let text = message.content.split(' ')[2];
		if (!lang || !text) {
			return message.reply(`What is the language and text you want me to translate to: ${prefix}translate <lang> <text>`);
		}
		try {
			const result = await translate(text, { to: lang });
			const embed = new Discord.EmbedBuilder()
				.setTitle('Translator')
				.setDescription(`Translated to: ${lang}\n\nOriginal Text: ${text}\n\nTranslated Text: ${result.text}`)
			return message.channel.send({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			return message.reply('Something went wrong while trying to translate the text. If this continues to happen, contact the bot owner');
		}
	}
	if (command === 'serverinfo') {
		const embed = new Discord.EmbedBuilder()
			.setTitle(`Information about ${message.guild.name}`)
			.setDescription(`Server ID: ${message.guild.id}\nMember Count: ${message.guild.memberCount}\nRole Count: ${message.guild.roles.cache.size}\nChannel Count: ${message.guild.channels.cache.size}`)
		return message.channel.send({ embeds: [embed] });
	}
	if (command === 'addcmd') {
		if (!message.member.permissions.has('ManageGuild')) {
			return message.reply('You are missing the following permission to use this command: ManageGuild');
		}
		const [commandName, ...cmdResponse] = args;
		if (!commandName || !cmdResponse.length) {
			return message.reply('Usage: `${prefix}addcmd <name> <response>`');
		}
		const blockedwords = fs.readFileSync('blockedwords.txt', 'utf-8').split('\n').map(word => word.trim());
		const containsWord = args.some(arg => blockedwords.includes(arg.toLowerCase()));
		if (containsWord) {return message.reply('Please do not create commands that includes words or phrases related to illegal content, scamming, or racism');}

		const guildId = message.guild.id;
		if (!customCommands[guildId]) {
			customCommands[guildId] = {};
		}
		customCommands[guildId][commandName] = cmdResponse.join(' ');
		saveCommands();
		return message.reply(`Custom command \`${commandName}\` added successfully!`);
	}
	if (command === 'delcmd') {
		if (!message.member.permissions.has('ManageGuild')) {
			return message.reply('You are missing the following permission to use this command: ManageGuild');
		}
		const name = args[0]?.toLowerCase();
		if (!name || !customCommands[guildId] || !customCommands[guildId][name]) {
			return message.reply('That command could not be found');
		}
		delete customCommands[guildId][name];
		saveCommands();
		return message.reply(`🗑️ Command \`${name}\` deleted successfully!`);
	}
	if (command === 'listcmds') {
        const cmds = customCommands[guildId] ? Object.keys(customCommands[guildId]) : [];
		if (!cmds.length) return message.reply('There are no custom commands created for this server.');

		const embed = new Discord.EmbedBuilder()
			.setTitle(`📜 Custom Commands in ${message.guild.name}`)
			.setDescription(cmds.map(cmd => `\`${prefix}${cmd}\``).join('\n'))
			.setFooter({ text: `Total: ${cmds.length}` });
		return message.channel.send({ embeds: [embed] });
	}
	if (command === 'resetccmds') {
		if (!message.member.permissions.has('Administrator')) {
			return message.reply('You are missing the following permission to use this command: Administrator');
		}
		if (!customCommands[guildId] || Object.keys(customCommands[guildId]).length === 0) {
			return message.reply('❌ There are no custom commands to remove for this server.');
		}
		delete customCommands[guildId];
		saveCommands();

		return message.reply('All custom commands for this server has been removed.');
	}



	if (customCommands[guildId] && customCommands[guildId][command]) {
		const response = customCommands[guildId][command];
		if (response.startsWith('embed:')) {
			const embedresponse = customCommands[guildId][command].slice(6).trim();
			const embed = new Discord.EmbedBuilder()
				.setDescription(embedresponse)
			return message.channel.send({ embeds: [embed] });
		} else if (response.startsWith('reply:')){
			const replyresponse = processResponse(response.slice(6).trim(), message);
			message.reply(replyresponse);
		} else if (response.startsWith('nsfw:')){
			if (!message.channel.nsfw) return message.reply('This custom command requires the use of a NSFW marked channel')
			const replyresponse = processResponse(response.slice(6).trim(), message);
			return message.channel.send(replyresponse);
		} else if (response.startsWith('admin:')){
			if (!message.member.permissions.has('Administrator')) {
				return message.reply('You are missing the following permission to use this command: Administrator');
			}
			const replyresponse = processResponse(response.slice(6).trim(), message);
			return message.channel.send(replyresponse);
		} else {
			const standardresponse = processResponse(response, message);
			return message.channel.send(standardresponse);
		}
		return message.channel.send(customCommands[guildId][command]);
	}
});

client.login(discordbottoken);