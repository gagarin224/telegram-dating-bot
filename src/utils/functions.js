const fs = require('fs').promises;
const User = require('../db/models/user');
const Like = require('../db/models/like');
const { min, max } = require('../config/config.json');

async function checkUser(chatId) {
    const data = await User.findOne({
        chatId
    });

    if (data) return data;
    else return false;
}

async function findProfile(age, gender, history) {
    if (gender === "Девушки") gender = "Девушка";
    else if (gender === "Парни") gender = "Парень";

    const result = await User.find({ gender, status: true });

    for (let i = 0; i < result.length; i++)
        if (!history.includes(result[i].chatId))
            if (result[i].age >= age - min && result[i].age <= age + max) return result[i];
                else return false;
}

async function pushHistory(ctx, memberId) {
    try {
        const data = await fs.readFile('session.json', 'utf-8');
        const array = JSON.parse(data);

        ctx.session.history.push(memberId);

        await fs.writeFile('session.json', JSON.stringify(array));
    } catch (err) {
        console.error(err);
    }
}

async function newLike(userId, memberId) {
    await new Like({
        userId,
        memberId,
        status: true
    }).save();
}

async function newLikeMessage(userId, memberId, message) {
    await new Like({
        userId,
        memberId,
        status: true,
        message
    }).save();
}

async function checkLikes(memberId) {
    const data = await Like.findOne({
        memberId,
        status: true
    });

    if (data) return data;
    else return false;
}

async function getMemberUsername(ctx, userId) {
    return await ctx.telegram.getChat(userId).then(chat => {
        ctx.session.username = chat.first_name
        return ctx.session.username;
    });
}

async function getPrivateForwardsType(ctx) {
    return await ctx.telegram.getChat(ctx.chat.id).then(chat => {
        ctx.session.has_private_forwards = chat?.has_private_forwards ?? false;
        return ctx.session.has_private_forwards;
    });
}

module.exports = {
    checkUser,
    findProfile,
    pushHistory,
    newLike,
    newLikeMessage,
    checkLikes,
    getMemberUsername,
    getPrivateForwardsType
}