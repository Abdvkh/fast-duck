const { Scenes } = require('telegraf');
const { WizardScene } = Scenes;

const storeData = (winnerData) => {
    // logic for handling data
};

const winnerDataWizard = new WizardScene(
    'WINNER_DATA_WIZARD_SCENE_ID',
    (ctx) => {
        ctx.replyWithMarkdown('Отлично. Теперь Вам придется немного поработать ручками. Начнем.\n📦 Напишите номер бокса, который Вы выиграли?\n\n_Например: 125_');
        ctx.wizard.state.winnerData = {};
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.boxNumber = ctx.message.text;
        ctx.replyWithMarkdown('💵 Какую цену Вы указали за него?\n\n_Например: 600_');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.price = ctx.message.text;
        ctx.replyWithMarkdown('👌🏻 Теперь напишите город, куда наши голуби должны доставить Ваш бокс?\n\n_Например: Харьков_');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.city = ctx.message.text;
        ctx.replyWithMarkdown('👍🏻 Супер! Еще чуть-чуть и Вы сможете выйти из этого чата. А пока ответьте еще на один вопрос.\nМы сейчас работаем через новую почту. Вам отправлять на отделение или прямо к двери?');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.deliveryType = ctx.message.text;
        ctx.replyWithMarkdown('📫 Напишите адрес доставки.\n\n_Например: Харьков, ул. Счастья 19_');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.address = ctx.message.text;
        ctx.replyWithMarkdown('📞 Укажите номер телефона получателя.\n\n_Например: 098 888 88 88*(минимум 10 символов)*_');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.phoneNumber = ctx.message.text;
        ctx.replyWithMarkdown('✏ Не волнуйтесь, мясо уже почти у Вас на гриле. А пока напишите ФИО получателя через пробел.\n\n_Например: Винник Олег*(минимум 10 символов)*_');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.fullName = ctx.message.text;
        ctx.replyWithMarkdown('💳 Это предпоследний вопрос. Выберите удобный способ оплаты для Вас: наложенный платеж или карта?');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.winnerData.paymentType = ctx.message.text;
        ctx.replyWithMarkdown('🙌🏻 Принято. Ожидайте в ближайшее время от нас весточку.');
        ctx.replyWithMarkdown('📸 Для подтверждения нажмите \'+\' или отправь фото/скрин оплаты.');
        return ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.winnerData.paymentApprovalPhoto = ctx.message.photo;
        await storeData(ctx.wizard.state.winnerData);
        return ctx.scene.leave();
    },
);

module.exports = {
    winnerDataWizard
};