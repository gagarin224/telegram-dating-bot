const { setupBot } = require('./src/bot');
const { connectToDatabase } = require('./src/db/database');
const { validateConfig } = require('./src/utils/functions');
const config = require('./src/config/config.json');
const Logger = require('./src/services/Logger');

(async function () {
    try {
        validateConfig(config);

        await connectToDatabase();

        const bot = await setupBot();

        bot.launch();

        Logger.log('[Telegram] Bot is ready.');
    } catch (error) {
        Logger.error('[Telegram] Launch error: ', error);
    }
})();