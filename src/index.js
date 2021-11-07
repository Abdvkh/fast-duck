const dotenv = require('dotenv');
const { Telegraf, Scenes, session } = require('telegraf');
const { Stage } = Scenes;
const { welcome, help, fillForm } = require('./commands/main');
const { winnerDataWizard } = require('./scenes/winner-data.scene');

dotenv.config();

const stage = new Stage([winnerDataWizard], { default: 'WINNER_DATA_WIZARD_SCENE_ID' })
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session())
bot.use(stage.middleware())

bot.start(welcome);
bot.help(help);

bot.command('menu', welcome);

bot.action('fillForm', fillForm);
bot.action('help', help);

bot.launch();
