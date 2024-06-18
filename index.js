const { setupBot } = require('./src/bot');
const { connectToDatabase } = require('./src/db/database');
const { validateConfig } = require('./src/utils/functions');
const config = require('./src/config/config.json');

(async function () {
    try {
        validateConfig(config);

        await connectToDatabase();

        const bot = await setupBot();

        bot.launch();

        console.log('[Telegram] Bot is ready.');
    } catch (error) {
        console.log('[Telegram] Launch error: ', error);
    }
})();