import { startButton } from '../utils/buttons.js';
import { CMD_TEXT } from '../utils/constants.js';

const start = async (ctx) => {
    await ctx.reply(CMD_TEXT.start, {
        ...startButton
    });
    await ctx.scene.enter('start');
};

export { start };