# Axol Bot

Axol Bot is a Revolt.chat bot made by the Axol's Software community. It has:

- Moderation commands like kick, ban, nick, and purge.
- Simple custom commands system
- Utility commands like say, esay, and serverinfo commands.

This source code now includes a Discord bot build you can use.

## Setup Guide

Before setting up this bot, here are the minimum requirements to run this bot on your server

- Node v20 or newer (Node v22 or newer recommended).
- 512mb ram and 512mb disk space free (1gb ram free recommended)

Assuming your server or computer meets the minimum requirements, you can now start setting up the bot. Below is the steps to setup the bot.

1. Copy/Fork this source code to your computer or server from your hosting provider
2. Create a Revolt.chat bot at https://app.revolt.chat/settings/bots and copy the bot's token
3. Open the config.json file and fill in everything it asks for

```json
{
	"revoltbottoken": "", #Your Revolt.chat bot token
	"revoltbotprefix": "a!", #Your bot prefix the bot will respond to
	
	"webport": 5000, #Your web port (if using the webserver)
	"launchmode": "0" #Can use the following values: 0 (Revolt.chat bot ONLY), 1 (Revolt.chat bot and webserver)
}
```

4. Open the blockedwords.txt file and put in words or phrases (seperated with each line) you don't want the bot to say with the say or esay commands.
5. Install the required packages. (You can use "npm install" without the quotation marks to install everything from the package.json file).
6. Launch the bot and enjoy (which can be done by running "node ." without the quotation marks).

## Links

[Invite the Revolt bot](https://app.revolt.chat/bot/01JRE2PH7RJAZQ5YHW235QQ31H) - [Revolt Server](https://rvlt.gg/WJmNxmkv) - [Discord Server](https://discord.gg/hrUV9aq3p2) - [Developers Youtube](https://www.youtube.com/channel/UCCYCRAt1srptO3dc7eeN4Yw)