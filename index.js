import { setupBot } from './src/bot.js';
import { connectToDatabase } from './src/db/database.js';
import { validateConfig } from './src/utils/functions.js';
import config from './src/config/config.json' assert { type: 'json' };
import Logger from './src/services/Logger.js';

(async () => {
    try {
        validateConfig(config);

        await connectToDatabase();

        const bot = await setupBot();

        bot.launch();

        Logger.info('[Telegram] Bot is ready.');
    } catch (error) {
        Logger.error('[Telegram] Launch error: ', error);
    }
})();