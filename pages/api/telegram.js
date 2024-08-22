import TelegramBot from "node-telegram-bot-api";
import { sendMessage } from "./predict";

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Handle the /eligibility command
bot.onText(/\/eligibility (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const projectDescription = match[1]; // Extract the project description from the command

  // Call the eligibility evaluation function
  const response = await sendMessage(projectDescription);

  // Send the response back to the group
  bot.sendMessage(chatId, response);
});

// Handle other commands or messages here...
