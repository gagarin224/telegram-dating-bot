import { Scenes } from 'telegraf';
import DatabaseHelper from '../helpers/DatabaseHelper.js';
import { BUTTON_TEXT, SCENES_TEXT } from '../utils/constants.js';

export default class Start {
    static FirstStep() {
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