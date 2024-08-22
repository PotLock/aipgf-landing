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

const setWebhook = async () => {
  const webhookUrl = `https://www.aipgf.com//api/telegram`;
  await bot.setWebHook(webhookUrl);
};

// Handle other commands or messages here...
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
      return res.status(200).send("OK");
    });

    // Handle errors in case the request is not completed
    req.on("error", (err) => {
      console.error("Error processing request:", err);
      return res.status(500).send("Internal Server Error");
    });
  } else {
    // Respond with 405 for methods other than POST
    return res.status(405).send("Method Not Allowed");
  }
};

setWebhook();

export default handler;
