const { setupBot } = require('./src/bot');
const { connectToDatabase } = require('./src/db/database');

(async function () {
    try {
        await connectToDatabase();

        const bot = await setupBot();

        bot.launch();

        console.log('[Telegram] Bot is ready.');
    } catch (error) {
        console.log('[Telegram] Launch error: ', error);
    }
})();