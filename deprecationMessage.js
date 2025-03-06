const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const ioeChatIdsPath = path.join(__dirname, 'src', 'ioe', 'IOEChatIds.json');
const iomChatIdsPath = path.join(__dirname, 'src', 'iom', 'IOMChatIds.json');

const ioeChatIds = JSON.parse(fs.readFileSync(ioeChatIdsPath, 'utf-8'));
const iomChatIds = JSON.parse(fs.readFileSync(iomChatIdsPath, 'utf-8'));

const allChatIds = [...new Set([...ioeChatIds, ...iomChatIds])];

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN_IOE, {
	polling: false
});

const message =
	`⚠️ *IOE-IOM Notice Alert Bot is Deprecated* ⚠️\n\n` +
	`Dear Users,\n\n` +
	`This bot is no longer functional due to the lack of a server to host it. ` +
	`Thank you for using our service. The repository remains available for reference.\n\n` +
	`We apologize for any inconvenience caused. 🙏\n\n` +
	`- *IOE-IOM Notice Alert Bot Team*`;

const sendMessageToAll = async () => {
	for (const chatId of allChatIds) {
		try {
			await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
			console.log(`Message sent to ${chatId}`);
		} catch (error) {
			console.error(`Failed to send message to ${chatId}:`, error.message);
		}
	}
};

sendMessageToAll().then(() => {
	console.log('Notification process completed.');
	process.exit(0);
});
