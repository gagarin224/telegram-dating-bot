const User = require('../db/models/user');
const { min, max } = require('../config/config.json');

class TelegramService {
    constructor(client) {
        this.client = client;
    }

    async _findProfile(age, gender, history) {
        if (gender === "Девушки") gender = "Девушка";
        else if (gender === "Парни") gender = "Парень";

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

module.exports = TelegramService;