# About the project

This is a bot for Telegram that lets you remember your stickers and make them available through inlineQuery `(@(bot_name))`. Written using `grammY`, `Prisma` and `Fuse.js`.

# Installation

1. Get a free Bot Token from BotFather in Telegram
2. Enable inline queries in your bot
3. Clone the repo git clone `https://github.com/idrevnii/stickerbot`
4. Create in root directory `.env` file with field `BOT_TOKEN` and assign your token from BotFather
5. Install NPM packages `npm install` or `yarn`
6. Run the bot `npm start` or `yarn start`

OR

5. Run `docker-compose up` if you want to use Docker.

# Usage

First add stickers in private chat with the bot, then you can use them in any chat by typing alias with `@(your_bot_name) (alias)`
