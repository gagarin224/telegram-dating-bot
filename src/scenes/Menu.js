const { Scenes } = require('telegraf');
const { token } = require('../config/config.json');
const { SCENES_TEXT, BUTTON_TEXT } = require('../utils/constants');
const { menuButton, profileButton, hideButton, returnMenuButton, viewProfileButton, likeButton, waitButton } = require('../utils/buttons');
const { checkUser, findProfile, pushHistory, newLike, newLikeMessage, checkLikes, getMemberUsername, getPrivateForwardsType } = require('../utils/functions');

class Menu {
    Main() {
        const main = new Scenes.BaseScene('main');

        main.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.main_enter, {
                ...menuButton
            });
        });

        main.on('text', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.view_profiles:
                    await ctx.scene.enter('view');
                    break;
                case BUTTON_TEXT.my_profile:
                    await ctx.scene.enter('profile');
                    break;
                case BUTTON_TEXT.likes:
                    await ctx.scene.enter('likes');
                    break;
                case BUTTON_TEXT.hide_profile:
                    await ctx.scene.enter('hide');
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                    break;
            }
        });

        return main;
    }

    View() {
        const view = new Scenes.BaseScene('view');

        view.enter(async (ctx) => {
            const isPrivate = await getPrivateForwardsType(ctx);

            if (isPrivate) {
                await ctx.reply(SCENES_TEXT.private_forwards);
                return await ctx.scene.enter('main');
            }

            const { age, wantedGender, history } = ctx.session;

            const result = await findProfile(age, wantedGender, history);

            if (result) {
                const { chatId, name, age, city, description, photo } = result;
                ctx.session.memberId = chatId;

                if (description != BUTTON_TEXT.skip) await ctx.replyWithPhoto({ url: photo }, { caption: `${name}, ${age}, ${city} - ${description}`, ...viewProfileButton });
                else await ctx.replyWithPhoto({ url: photo }, { caption: `${name}, ${age}, ${city}`, ...viewProfileButton });
            } else {
                await ctx.reply(SCENES_TEXT.view_error);
                return ctx.scene.enter('main');
            }
        });

        view.on('text', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.view_like:
                    await newLike(ctx.chat.id, ctx.session.memberId);
                    ctx.telegram.sendMessage(ctx.session.memberId, SCENES_TEXT.view_like);
                    await pushHistory(ctx, ctx.session.memberId);
                    await ctx.scene.enter('view');
                    break;
                case BUTTON_TEXT.view_message:
                    await pushHistory(ctx, ctx.session.memberId);
                    await ctx.scene.enter('viewmessage');
                    break;
                case BUTTON_TEXT.view_unlike:
                    await pushHistory(ctx, ctx.session.memberId);
                    await ctx.scene.enter('view');
                    break;
                case BUTTON_TEXT.return_menu:
                    await ctx.scene.enter('main');
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                    break;
            }
        });

        return view;
    }

    ViewMessage() {
        const view_message = new Scenes.BaseScene('viewmessage');

        view_message.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.view_message_enter);
        });

        view_message.on('text', async (ctx) => {
            await newLikeMessage(ctx.chat.id, ctx.session.memberId, ctx.message.text);
            ctx.telegram.sendMessage(ctx.session.memberId, SCENES_TEXT.view_like);
            await ctx.scene.enter('view');
        });

        view_message.on('message', async (ctx) => {
            return await ctx.reply(SCENES_TEXT.view_message_error);
        });

        return view_message;
    }

    Profile() {
        const profile = new Scenes.BaseScene('profile');

        profile.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_approve_enter, {
                ...profileButton
            });

            const { name, age, city, description, photo } = ctx.session;

            if (description != BUTTON_TEXT.skip) await ctx.replyWithPhoto({ url: photo }, { caption: `${name}, ${age}, ${city} - ${description}` });
            else await ctx.replyWithPhoto({ url: photo }, { caption: `${name}, ${age}, ${city}` });
        });

        profile.on('text', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.change_profile:
                    await ctx.scene.enter('name');
                    break;
                case BUTTON_TEXT.change_photo_profile:
                    await ctx.scene.enter('newphoto');
                    break;
                case BUTTON_TEXT.change_text_profile:
                    await ctx.scene.enter('newdescription');
                    break;
                case BUTTON_TEXT.return_menu:
                    await ctx.scene.enter('main');
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                    break;
            }
        });

        return profile;
    }

    Likes() {
        const likes = new Scenes.BaseScene('likes');

        likes.enter(async (ctx) => {
            const isPrivate = await getPrivateForwardsType(ctx);

            if (isPrivate) {
                await ctx.reply(SCENES_TEXT.private_forwards);
                return await ctx.scene.enter('main');
            }

            const result = await checkLikes(ctx.chat.id);

            if (result) {
                const { userId, message } = result;
                const data = await checkUser(userId);
                const { name, age, city, description, photo } = data;

                if (message) {
                    if (description != BUTTON_TEXT.skip) await ctx.replyWithPhoto({ url: photo }, { caption: `${SCENES_TEXT.likes_enter}\n\n${name}, ${age}, ${city} - ${description}\n\n${SCENES_TEXT.likes_message_for_you} ${message}`, ...likeButton });
                    else await ctx.replyWithPhoto({ url: photo }, { caption: `${SCENES_TEXT.likes_enter}\n\n${name}, ${age}, ${city}\n\n${SCENES_TEXT.likes_message_for_you} ${message}`, ...likeButton });
                } else {
                    if (description != BUTTON_TEXT.skip) await ctx.replyWithPhoto({ url: photo }, { caption: `${SCENES_TEXT.likes_enter}\n\n${name}, ${age}, ${city} - ${description}`, ...likeButton });
                    else await ctx.replyWithPhoto({ url: photo }, { caption: `${SCENES_TEXT.likes_enter}\n\n${name}, ${age}, ${city}`, ...likeButton });
                }
            } else {
                await ctx.reply(SCENES_TEXT.likes_error);
                return await ctx.scene.enter('main');
            }
        });

        likes.on('text', async (ctx) => {
            const data = await checkLikes(ctx.chat.id);
            const { userId, memberId } = data;
            const name = await getMemberUsername(ctx, userId);

            const link_member = `<a href="tg://user?id=${memberId}">${ctx.message.from.first_name}</a>`
            const link_user = `<a href="tg://user?id=${userId}">${name}</a>`

            if (ctx.message.text === BUTTON_TEXT.view_like) {
                await ctx.telegram.sendMessage(userId, SCENES_TEXT.likes_message + link_member, {
                    parse_mode: 'HTML',
                });
                await ctx.reply(SCENES_TEXT.likes_message_user + link_user, {
                    parse_mode: 'HTML',
                });
                data.status = false;
                await data.save();
                return await ctx.scene.enter('likes');
            } else {
                data.status = false;
                await data.save();
                return await ctx.scene.enter('likes');
            }
        });

        return likes;
    }

    ChangePhoto() {
        const photo = new Scenes.BaseScene('newphoto');

        photo.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_photo, {
                ...returnMenuButton
            });
        });

        photo.on('photo', async (ctx) => {
            const photoURLStart = ctx.message.photo[ctx.message.photo.length-1].file_id;

            const photoURLEnd = `https://api.telegram.org/bot${token}/getFile?file_id=${photoURLStart}`;

            await fetch(photoURLEnd).then(async (res) => await res.text())
            .then(async (text) => {
                const textMatch = text.match(/[a-zA-Z]*\/[a-zA-Z0-9_]*.[a-zA-Z]*/g);
                let photoURL = `https://api.telegram.org/file/bot${token}/${textMatch}`;
                ctx.session.data.photo = photoURL;
                await ctx.reply(SCENES_TEXT.update_photo);
                await ctx.scene.enter('main');
            });
        });

        photo.on('message', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.return_menu:
                    await ctx.scene.enter('main');
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.update_photo_error);
                    break;
            }
        });

        return photo;
    }

    ChangeDescription() {
        const description = new Scenes.BaseScene('newdescription');

        description.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_description, {
                ...returnMenuButton
            }
        );
        });

        description.on('text', async (ctx) => {
            const currentDescription = ctx.message.text;

            if (currentDescription && currentDescription != BUTTON_TEXT.return_menu) {
                ctx.session.data.description = currentDescription;
                await ctx.reply(SCENES_TEXT.update_description);
                await ctx.scene.enter('main');
            } else if (currentDescription === BUTTON_TEXT.return_menu) await ctx.scene.enter('main');
        });

        description.on('message', async (ctx) => {
            return await ctx.reply(SCENES_TEXT.update_description_error);
        });

        return description;
    }

    Hide() {
        const hide = new Scenes.BaseScene('hide');

        hide.enter((ctx) => {
            ctx.reply(SCENES_TEXT.hide_enter, {
                ...hideButton
            });
        });

        hide.on('text', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.yes:
                    const data = await checkUser(ctx.chat.id);

                    await ctx.reply(SCENES_TEXT.hide_yes, {
                        ...waitButton
                    });

                    data.status = false;
                    data.save();

                    await ctx.scene.enter('wait');
                    break;
                case BUTTON_TEXT.no:
                    await ctx.scene.enter('main');
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                    break;
            }
        });

        return hide;
    }

    Wait() {
        const wait = new Scenes.BaseScene('wait');

        wait.on('text', async (ctx) => {
            switch (ctx.message.text) {
                case BUTTON_TEXT.view_profiles:
                    const data = await checkUser(ctx.chat.id);

                    await ctx.scene.enter('main');
                    data.status = true;
                    await data.save();
                    break;
                default:
                    await ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                    break;
            }
        });

        return wait;
    }
}

module.exports = Menu;