const { Scenes, Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const { session } = require('telegraf-session-mongodb');
const DatabaseHelper = require('../src/helpers/DatabaseHelper');
const SceneGenetator = require('./scenes/Register');
const { token } = require('./config/config.json');
const { start } = require('./controllers/commands');
const curScene = new SceneGenetator();
const nameScene = curScene.GetName();
const ageScene = curScene.GetAge();
const genderScene = curScene.GetGender();
const wantedGenderScene = curScene.GetWantedGender();
const cityScene = curScene.GetCity();
const descriptionScene = curScene.GetDescription();
const photoScene = curScene.GetPhoto();
const approveScene = curScene.ApproveRegister();
const StartSceneGenerator = require('./scenes/Start');
const startCurScene = new StartSceneGenerator();
const firstScene = startCurScene.FirstStep();
const MenuSceneGenerator = require('./scenes/Menu');
const menuCurScene = new MenuSceneGenerator();
const main = menuCurScene.Main();
const view = menuCurScene.View();
const view_message = menuCurScene.ViewMessage();
const profile = menuCurScene.Profile();
const likes = menuCurScene.Likes();
const hide = menuCurScene.Hide();
const wait = menuCurScene.Wait();
const updatePhoto = menuCurScene.ChangePhoto();
const updateDescription = menuCurScene.ChangeDescription();

const bot = new Telegraf(token);

const stage = new Scenes.Stage([
    nameScene, 
    ageScene, 
    genderScene, 
    wantedGenderScene, 
    cityScene, 
    descriptionScene, 
    photoScene, 
    approveScene, 
    firstScene, 
    main, 
    view, 
    view_message, 
    profile, 
    likes, 
    updatePhoto, 
    updateDescription, 
    hide,
    wait
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

module.exports = {
    setupBot
}