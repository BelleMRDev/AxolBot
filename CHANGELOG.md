# Axol Bot for Revolt.chat

Here is the changelog for all of the changes made to the Axol bot.

### Version 1.0.3 - June 21st, 2025

- Custom commands feature now supports some values. Supported values: {server_id}, {server_name}, {server_owner}, {author_id}
- Improved the translate and addcmd commands slightly.
- Added a bew tag for the custom commands feature: admin: (Makes the command only usable to users with the Manage Server permission)

### Version 1.0.2 - June 14th, 2025

- Added the ability to make NSFW based commands for the custom commands feature with the new nsfw: tag
- Made a Dockerfile which hopefully works
- Added a setup.sh file for easy setup on Linux.
- Updated the webserver part to mention the new stuff within v1.0.1 and v1.0.2. Updated the privacy policy to show another way to contact me.

### Version 1.0.1 - May 27th, 2025

- Added a rolecolor command which allows you to change your role color with role gradient support
- Added a translate command.
- Updated the ping command to show the bot and API latency
- Fixed typos in the README.md file

### Version 1.0.0 - May 17th, 2025

The first release for the Axol Bot from Axol's Software. Here is the features of the initial release.

- The bot is using revolt.js v6.0.20
- Added the following commands: help, ping, botinfo, say, esay, dice, serverinfo, addcmd, deletecmd, listcmds, resetccmds, nick, purge, kick, ban, unban
- The custom commands and say commands have a filter so bad stuff can not be said through the bot.
- You can not create custom commands with a command name of an already built-in command and you need the Kick Members permission to create and remove custom commands.
- Custom commands supports embed and standard response messages
- Code includes a webserver with the index page with documentation and privacy policy.
- The project is licensed under the Apache License 2.0

Note: This was going to have a timeout command but I gave up on this because it is somehow impossible to do and I am still getting little to no help.