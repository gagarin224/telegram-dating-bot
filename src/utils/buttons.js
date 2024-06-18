import { Markup } from 'telegraf';
import { BUTTON_TEXT } from '../utils/constants.js';

const startButton =
    Markup.keyboard([
        [BUTTON_TEXT.button_yes, BUTTON_TEXT.button_no]
    ])
    .oneTime()
    .resize()

const genderButton =
    Markup.keyboard([
        [BUTTON_TEXT.man, BUTTON_TEXT.woman],
    ])
    .oneTime()
    .resize()

const wantedGenderButton =
    Markup.keyboard([
        [BUTTON_TEXT.men, BUTTON_TEXT.women],
    ])
    .oneTime()
    .resize()

const descriptionButton =
    Markup.keyboard([
        [BUTTON_TEXT.skip],
    ])
    .oneTime()
    .resize()

const approveButton =
    Markup.keyboard([
        [BUTTON_TEXT.yes, BUTTON_TEXT.change],
    ])
    .oneTime()
    .resize()

const menuButton =
    Markup.keyboard([
        [BUTTON_TEXT.view_profiles, BUTTON_TEXT.my_profile, BUTTON_TEXT.likes ,BUTTON_TEXT.hide_profile],
    ])
    .oneTime()
    .resize()

const profileButton =
    Markup.keyboard([
        [BUTTON_TEXT.change_profile, BUTTON_TEXT.change_photo_profile, BUTTON_TEXT.change_text_profile, BUTTON_TEXT.return_menu],
    ])
    .oneTime()
    .resize()

const hideButton =
    Markup.keyboard([
        [BUTTON_TEXT.yes, BUTTON_TEXT.no],
    ])
    .oneTime()
    .resize()

const returnMenuButton =
    Markup.keyboard([
        [BUTTON_TEXT.return_menu],
    ])
    .oneTime()
    .resize()

const viewProfileButton =
    Markup.keyboard([
        [BUTTON_TEXT.view_like, BUTTON_TEXT.view_message, BUTTON_TEXT.view_unlike, BUTTON_TEXT.return_menu],
    ])
    .oneTime()
    .resize()

const likeButton =
    Markup.keyboard([
        [BUTTON_TEXT.view_like, BUTTON_TEXT.view_unlike],
    ])
    .oneTime()
    .resize()

const waitButton =
    Markup.keyboard([
        [BUTTON_TEXT.view_profiles],
    ])
    .oneTime()
    .resize()

export {
    startButton,
    genderButton,
    wantedGenderButton,
    descriptionButton,
    approveButton,
    menuButton,
    profileButton,
    hideButton,
    returnMenuButton,
    viewProfileButton,
    likeButton,
    waitButton
};