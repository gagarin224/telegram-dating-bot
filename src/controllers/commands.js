const { startButton } = require('../utils/buttons');
const { CMD_TEXT } = require('../utils/constants');

const start = async (ctx) => {
    ctx.reply(CMD_TEXT.start, {
      ...startButton
    }
    );
    await ctx.scene.enter('start');
}

module.exports = {
    start
}