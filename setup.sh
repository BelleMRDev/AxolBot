#!/bin/sh
echo "Axol Bot Setup - By Axol's Software"
echo "Press the approprite key to start an action"
echo "x) Close setup.sh script"
echo "0) Information about the Axol Bot"
echo "1) Launch the application"
echo "2) Install required npm packages (for the Revolt.chat bot ONLY)"
echo "3) Install required npm packages (for the Revolt.chat bot and Discord bot)"
echo "4) Install required npm packages"
while true; do
	read -n 1 -p "Enter Option: " option
	case $option in
		[x]* )
			echo
			echo "The setup.sh script is now closing...."
			exit 1
		;;
		[0]* )
			echo
			echo "Axol Bot"
			echo "Axol Bot is a Revolt.chat bot made by the Axol's Software community."
			echo "It has:"
			echo "- Moderation commands like kick, ban, nick, and purge."
			echo "- Simple custom commands system"
			echo "- Utility commands like say, esay, and serverinfo commands."
		;;
		[1]* )
			echo
			node index.js
		;;
		[2]* )
			echo
			echo "Installing NPM Packages (for Revolt bot ONLY)"
			sudo npm install revolt.js@6.0.20
			sudo npm install axios
			sudo npm install nodemon
			sudo npm install @iamtraction/google-translate
		;;
		[3]* )
			echo
			echo "Installing NPM Packages (for Revolt bot and Discord bot)"
			sudo npm install discord.js@14.21.0
			sudo npm install discord-api-types
			sudo npm install revolt.js@6.0.20
			sudo npm install axios
			sudo npm install nodemon
			sudo npm install node-fetch
			sudo npm install @iamtraction/google-translate
		;;
		[4]* )
			echo
			echo "Installing NPM Packages"
			sudo npm install discord.js@14.21.0
			sudo npm install discord-api-types
			sudo npm install revolt.js@6.0.20
			sudo npm install axios
			sudo npm install nodemon
			sudo npm install node-fetch
			sudo npm install @iamtraction/google-translate
			sudo npm install express
			sudo npm install ejs
			sudo npm install body-parser
		;;
		*)
            echo
            echo "Invalid option was provided"
		;;
	esac
done