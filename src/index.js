const content = require('./content');

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(Telegraf.log())


bot.command('start', content.start);


bot.hears('🌈 Começando', content.comocomecar);
bot.command('comocomecar', content.comocomecar);

bot.hears('👩‍🏫 Dicas', content.dicas);
bot.command('dicas', content.dicas);

bot.hears('🗣 Argumentos', content.argumentos);
bot.command('argumentos', content.argumentos);

bot.hears('📄 Propostas', content.propostas);
bot.command('propostas', content.propostas);

bot.hears('💌 Material publicitário', content.material);
bot.command('material', content.material);

bot.command('contribuir', content.contribuir);


bot.on('sticker', content.randomLogoImage);

bot.startPolling()

console.log('\n> EleNuncaBot online!\n');