import TelegramBot from "node-telegram-bot-api";
import { sendMessage } from "./predict"; // Assuming sendMessage is defined in this file

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);

// Disable body parsing for raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle incoming updates from Telegram
const handler = async (req, res) => {
  if (req.method === "POST") {
    let body = "";

    // Collect the raw body data
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on("end", async () => {
      // Parse the incoming update
      const update = JSON.parse(body);

      // Process the update using the bot
      bot.processUpdate(update);

      // Respond with a 200 status to acknowledge receipt of the update
      res.status(200).send("OK");
    });
  } else {
    // Respond with 405 for methods other than POST
    res.status(405).send("Method Not Allowed");
  }
};

// Listen for messages and commands
bot.onText(/\/eligibility (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const projectDescription = match[1]; // Extract the project description from the command

  // Call the eligibility evaluation function
  const response = await sendMessage(projectDescription);

  // Send the response back to the user
  bot.sendMessage(chatId, response);
});

// Add more command handlers or message listeners as needed
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  // You can add more logic here for other messages
  bot.sendMessage(
    chatId,
    "I'm here to help! Use /eligibility to check project eligibility."
  );
});

export default handler;
