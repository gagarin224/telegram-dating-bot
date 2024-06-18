import User from '../db/models/user.js';
import { BUTTON_TEXT } from '../utils/constants.js';
import config from '../config/config.json' assert { type: 'json' };

const { min, max } = config;

export default class TelegramService {
    constructor(client) {
        this.client = client;
    }

    async _findProfile(age, gender, history) {
        if (gender === BUTTON_TEXT.women) gender = BUTTON_TEXT.woman;
        else if (gender === BUTTON_TEXT.men) gender = BUTTON_TEXT.man;

        const result = await User.find({ gender, status: true });

        for (let i = 0; i < result.length; i++)
            if (!history.includes(result[i].chatId))
                if (result[i].age >= age - min && result[i].age <= age + max) return result[i];
                    else return false;
    }

    async _getMemberUsername(ctx, userId) {
        return await ctx.telegram.getChat(userId).then((chat) => {
            ctx.session.username = chat.first_name
            return ctx.session.username;
        });
    }

    async _getPrivateForwardsType(ctx) {
        return await ctx.telegram.getChat(ctx.chat.id).then((chat) => {
            ctx.session.has_private_forwards = chat?.has_private_forwards ?? false;
            return ctx.session.has_private_forwards;
        });
    }
}