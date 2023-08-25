const { Scenes } = require('telegraf');
const DatabaseHelper = require('../helpers/DatabaseHelper');
const { BUTTON_TEXT, SCENES_TEXT } = require('../utils/constants');

class Start {
    FirstStep() {
        const start = new Scenes.BaseScene('start');

        start.on('text', async (ctx) => {
            if (ctx.message.text === BUTTON_TEXT.button_yes) {
                const data = await DatabaseHelper.checkUser({ chatId: ctx.from.id });

                if (data && data.status === false) {
                    await ctx.reply(SCENES_TEXT.comeback_profile);
                    await ctx.scene.enter('main');
                    data.status = true;
                    data.save()
                }
                else if (data && data.status === true) {
                    ctx.reply(SCENES_TEXT.start_already_registed);
                    await ctx.scene.enter('main');
                }
                else await ctx.scene.enter('name');
            } else {
                ctx.reply(SCENES_TEXT.start_no);
                await ctx.scene.reenter();
            }
        });

        return start;
    }
}

module.exports = Start;