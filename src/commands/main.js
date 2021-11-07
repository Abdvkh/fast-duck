const { Markup } = require('telegraf');
const { Scenes } = require('telegraf');
const { Stage } = Scenes;

const APP_CONFIG = {
    messages: {
        welcome: '🎉 Супер! Теперь Вы в главном меню. 🖐\nХотите получить Ваш бокс? Нажмите – «заполнить форму».\nЖелаете уточнить информацию по всяким мясным вопросам? Жмите «помощь».',
        help: '[👉Администрация Быстрой Утки](tg://user?id=747935620)\n[👉Чат Быстрой Утки](https://t.me/ytkaauction)\n\n✔️ Доступные команды:\n\n🔹 /menu - главное меню\n\n[🏷 Бот разработан](http://t.me/Abduvakhidov) для https://t.me/ytkaauction',
    },
};

const welcome = (ctx) => {
    const fillFormButton = Markup.button.callback('Заполнить форму', 'fillForm');
    const helpButton = Markup.button.callback('Помощь', 'help');
    const markup = Markup.inlineKeyboard([
        [
            fillFormButton,
            helpButton,
        ],
    ]);

    ctx.reply(APP_CONFIG.messages.welcome, markup);
};

const help = (ctx) => ctx.replyWithMarkdown(APP_CONFIG.messages.help);

const fillForm = Stage.enter('WINNER_DATA_WIZARD_SCENE_ID');

module.exports = {
    welcome: welcome,
    help: help,
    fillForm: fillForm,
};