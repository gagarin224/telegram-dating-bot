const { Scenes } = require('telegraf');
const fetch = require('node-fetch');
const DatabaseHelper = require('../helpers/DatabaseHelper');
const { token } = require('../config/config.json');
const User = require('../db/models/user');
const { genderButton, wantedGenderButton, descriptionButton, approveButton } = require('../utils/buttons');
const { BUTTON_TEXT, SCENES_TEXT } = require('../utils/constants');

class Register {
    GetName () {
        const username = new Scenes.BaseScene('name');

        username.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_username);
        });

        username.on('text', async (ctx) => {
            const currentName = ctx.message.text;

            if (currentName) {
                ctx.session.name = currentName;
                await ctx.scene.enter('age');
            } else {
                await ctx.reply(SCENES_TEXT.register_wrong_username);
                await ctx.scene.reenter();
            }
        });

        username.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_username));

        return username;
    }

    GetAge () {
        const age = new Scenes.BaseScene('age');

        age.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_age);
        });

        age.on('text', async (ctx) => {
            const currentAge = Number(ctx.message.text);

            if (currentAge && currentAge > 0 && currentAge < 130) {
                ctx.session.age = parseInt(currentAge);
                await ctx.scene.enter('gender');
            } else {
                await ctx.reply(SCENES_TEXT.register_provide_correct_value);
                await ctx.scene.reenter();
            }
        });

        age.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_age));

        return age;
    }

    GetGender() {
        const gender = new Scenes.BaseScene('gender');

        gender.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_gender, {
                ...genderButton
            }
            );
        });

        gender.on('text', async (ctx) => {
            const currentGender = ctx.message.text;
            if (currentGender && currentGender === BUTTON_TEXT.man || currentGender === BUTTON_TEXT.woman) {
                ctx.session.gender = currentGender;
                await ctx.scene.enter('wantedGender');
            } else {
                await ctx.reply(SCENES_TEXT.register_request_gender);
                await ctx.scene.reenter();
            }
        });

        gender.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_gender));

        return gender;
    }

    GetWantedGender() {
        const wantedGender = new Scenes.BaseScene('wantedGender');

        wantedGender.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_wanted_gender_enter, {
                ...wantedGenderButton
            }
            );
        });

        wantedGender.on('text', async (ctx) => {
            const currentWantedGender = ctx.message.text;
            if (currentWantedGender && currentWantedGender === BUTTON_TEXT.men || currentWantedGender === BUTTON_TEXT.women) {
                ctx.session.wantedGender = currentWantedGender;
                await ctx.scene.enter('city');
            } else {
                await ctx.reply(SCENES_TEXT.register_wrong_wanted_gender);
                await ctx.scene.reenter();
            }
        });

        wantedGender.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_wanted_gender));

        return wantedGender;
    }

    GetCity() {
        const city = new Scenes.BaseScene('city');

        city.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_city);
        });

        city.on('text', async (ctx) => {
            const currentCity = ctx.message.text;

            if (currentCity) {
                ctx.session.city = currentCity;
                await ctx.scene.enter('description');
            } else {
                await ctx.reply(SCENES_TEXT.register_wrong_city);
                await ctx.scene.reenter();
            }
        });

        city.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_city));

        return city;
    }

    GetDescription() {
        const description = new Scenes.BaseScene('description');

        description.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_description, {
                ...descriptionButton
            }
        );
        });

        description.on('text', async (ctx) => {
            const currentDescription = ctx.message.text;

            if (currentDescription && currentDescription != BUTTON_TEXT.skip) {
                ctx.session.description = currentDescription;
                await ctx.scene.enter('photo');
            } else {
                ctx.session.description = BUTTON_TEXT.skip;
                await ctx.scene.enter('photo');
            }
        });

        description.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_description));

        return description;
    }

    GetPhoto() {
        const photo = new Scenes.BaseScene('photo');

        photo.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_enter_photo, {
                reply_markup: {
                    remove_keyboard: true
                }
                }
            );
        });

        photo.on('photo', async (ctx) => {
            const photoURLStart = ctx.message.photo[ctx.message.photo.length-1].file_id;

            const photoURLEnd = `https://api.telegram.org/bot${token}/getFile?file_id=${photoURLStart}`;

            await fetch(photoURLEnd).then(async (res) => await res.text())
            .then(async (text) => {
                const textMatch = text.match(/[a-zA-Z]*\/[a-zA-Z0-9_]*.[a-zA-Z]*/g);
                let photoURL = `https://api.telegram.org/file/bot${token}/${textMatch}`;
                ctx.session.photo = photoURL;
                await ctx.scene.enter('approve');
            });
        });

        photo.on('message', (ctx) => ctx.reply(SCENES_TEXT.register_provide_photo));

        return photo;
    }

    ApproveRegister() {
        const approve = new Scenes.BaseScene('approve');

        approve.enter(async (ctx) => {
            await ctx.reply(SCENES_TEXT.register_approve_enter);

            if (ctx.session.description && ctx.session.description != BUTTON_TEXT.skip) {
                await ctx.replyWithPhoto({ url: `${ctx.session.photo}` }, { caption: `${ctx.session.name}, ${ctx.session.age}, ${ctx.session.city} - ${ctx.session.description}` });
            } else {
                await ctx.replyWithPhoto({ url: `${ctx.session.photo}` }, { caption: `${ctx.session.name}, ${ctx.session.age}, ${ctx.session.city}` });
            }

            await ctx.reply(SCENES_TEXT.register_approve_correct, {
                ...approveButton
            }
            );
        });

        approve.on('text', async (ctx) => {
            if (ctx.message.text === BUTTON_TEXT.yes) {
                const chatId = ctx.chat.id;
                const { name, age, gender, photo, wantedGender, city, description } = ctx.session;
                const registerDate = Date.now();
                const status = true;
                const history = [];

                const data = await DatabaseHelper.checkUser({ chatId: ctx.from.id });

                if (!data) {
                    await new User({
                        chatId,
                        name,
                        age,
                        gender,
                        wantedGender,
                        city,
                        description,
                        photo,
                        status,
                        registerDate
                    }).save();
                } else {
                    data.chatId = chatId;
                    data.name = name;
                    data.age = age;
                    data.gender = gender;
                    data.wantedGender = gender;
                    data.city = city;
                    data.description = description;
                    data.photo = photo;
                    data.status = status;
                    data.registerDate = registerDate;
                    data.save();
                }

                ctx.reply(SCENES_TEXT.register_approve_finish, {
                    reply_markup: {
                        remove_keyboard: true
                    }
                });

                ctx.session.history = history;
                await ctx.scene.enter('main');
            } else if (ctx.message.text === BUTTON_TEXT.change) {
                await ctx.scene.enter('name');
            } else {
                ctx.reply(SCENES_TEXT.register_wrong_asnwer);
                await ctx.scene.reenter();
            }
        });

        return approve;
    }
}

module.exports = Register;