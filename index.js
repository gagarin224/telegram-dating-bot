const { setupBot } = require('./src/bot');

(async function () {
    try {
        require('./src/db/database');

        await setupBot().launch();

        console.log('[Telegram] Bot is ready.');
    } catch (error) {
        console.log('[Telegram] Launch error: ', error);
    }
}());