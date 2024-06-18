import { Scenes, Telegraf } from 'telegraf';
import mongoose from 'mongoose';
import { session } from 'telegraf-session-mongodb';
import config from './config/config.json' assert { type: 'json' };
import DatabaseHelper from '../src/helpers/DatabaseHelper.js';
import Register from './scenes/Register.js';
import Start from './scenes/Start.js';
import Menu from './scenes/Menu.js';
import { start } from './controllers/commands.js';

const curScene = Register;
const startCurScene = Start;
const menuCurScene = Menu;

const {
    GetName: nameScene,
    GetAge: ageScene,
    GetGender: genderScene,
    GetWantedGender: wantedGenderScene,
    GetCity: cityScene,
    GetDescription: descriptionScene,
    GetPhoto: photoScene,
    ApproveRegister: approveScene
} = curScene;

const { FirstStep: firstScene } = startCurScene;

const { 
    Main: main, 
    View: view, 
    ViewMessage: view_message, 
    Profile: profile, 
    Likes: likes, 
    Hide: hide, 
    Wait: wait, 
    ChangePhoto: updatePhoto, 
    ChangeDescription: updateDescription 
} = menuCurScene;

const bot = new Telegraf(config.token);

const stage = new Scenes.Stage([
    nameScene(),
    ageScene(),
    genderScene(),
    wantedGenderScene(),
    cityScene(),
    descriptionScene(),
    photoScene(),
    approveScene(),
    firstScene(),
    main(),
    view(),
    view_message(),
    profile(),
    likes(),
    updatePhoto(),
    updateDescription(),
    hide(),
    wait()
]);

const setupBot = async () => {
    bot.use(session(mongoose.connection, { collectionName: 'sessions' }));
    bot.use(stage.middleware());

    bot.use(async (ctx, next) => {
        const sessionId = ctx.from.id.toString();
        ctx.session = await DatabaseHelper.loadSession({ key: sessionId });
        await next();
        await DatabaseHelper.saveSession({ key: sessionId, data: ctx.session });
    });

    bot.start(start);

    return bot;
}

export {
    setupBot
};