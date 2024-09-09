# AI-PGF

AI-powered public goods funding: A proactive grants program & movement building towards funding AGI by Potlock.

This repo contains the landing page which includes agent discovery and built-in agents.

- Website: https://aipgf.com
- Repository: https://github.com/potlock/aipgf-landing

## How to Run

**Note:** Please ensure you have installed [Node.js](https://nodejs.org/en/download/).

To preview and run the project on your device:

1. Open the project folder in [Visual Studio Code](https://code.visualstudio.com/download) or [Cursor](https://cursor.com).
2. In the terminal, run `npm install`.
3. Run `npm run dev` to view the project in your browser.

## Tech Stack

Next.js is a React framework that simplifies web application development. Key features include:

- **Pages Folder:** Next.js uses a file-based routing system. Files in the `pages` folder automatically become routes. For example, `pages/about.js` becomes `/about`.
- **TypeScript Support:** Next.js has built-in TypeScript support, allowing developers to use TypeScript for type-safe code.

TypeScript is a superset of JavaScript that adds optional static typing, enhancing code quality and developer productivity.

For more detailed information, refer to the [Next.js documentation](https://nextjs.org/docs).

## File Structure

```
aipgf-landing/
├── pages/
│   ├── index.tsx
│   └── ...
├── components/
│   └── ...
├── styles/
│   └── ...
├── public/
│   └── ...
├── lib/
│   └── ...
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Adding Your Own API Keys

1. Go to [OpenAI](https://platform.openai.com/account/api-keys).
2. Create a new key.
3. Create an `.env` file by making a copy of `.env.example`.
4. Add the OpenAI key to the `.env` file.

To get a Telegram API key:
1. Open Telegram and search for the [BotFather](https://t.me/BotFather) bot.
2. Start a chat with BotFather and send the command "/newbot".
3. Follow the prompts to create a new bot.
4. Once created, BotFather will provide you with an API token.
5. Copy this token and add it to your `.env` file as `NEXT_PUBLIC_TELEGRAM_BOT`.

## Contributing Guidelines

1. Fork the repository and create your branch from `main`.
2. Install dependencies using `npm install`.
3. Make your changes and ensure the code follows the project's coding style.
4. Write clear, concise commit messages.
5. Push your changes to your fork and submit a pull request to the `main` branch of the original repository.
6. Ensure your PR description clearly describes the problem and solution.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Resources

- [AI-PGF Explained](https://aipgf.com/explained)
- [AI-PGF Twitter](https://x.com/ai_pgf)
- [AI-PGF Forum](https://forum.aipgf.com/)
- [AI-PGF BOS Repository](https://github.com/potlock/aipgf-bos)
- [AI-PGF Contract](https://github.com/potlock/aipgf)
- [AI-PGF Telegram](https://aipgf.com/telegram)
- [AI-PGF Eligibility Agent](https://github.com/PotLock/AI-PGF-telegram-bot) and [Bot](https://t.me/aipgfbot)

## License

This project is licensed under the [MIT License](LICENSE).
