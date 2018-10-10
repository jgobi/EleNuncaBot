const API_TOKEN = (require('fs')).readFileSync('../API_PRIVATE_TOKEN', 'latin1');

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const bot = new Telegraf(API_TOKEN);

// bot.on('sticker', (ctx) => ctx.reply('👍'));


// bot.startPolling();
// console.log('\n> EleNuncaBot online!\n');


bot.use(Telegraf.log())

function keyboard () {
    return Markup
        .keyboard(['🌈 Começando', '👩‍🏫 Dicas', '🗣 Argumentos', '📄 Propostas', '💌 Material publicitário'])
        .oneTime(false)
        .resize()
        .extra()
}

bot.command('start', ({ reply }) => {
    reply('Obrigado por participar, aqui você pode encontrar informações e conteúdos publicitários para campanha', keyboard());
});

bot.command('inline', ({reply}) => {
    reply('Obrigado por participar, aqui você pode encontrar informações e conteúdos publicitários para campanha', Markup.inlineKeyboard([
        Markup.callbackButton('🌈 Começando', 'comocomecar'),
        Markup.callbackButton('👩‍🏫 Dicas', 'dicas'),
        Markup.callbackButton('🗣 Argumentos', 'argumentos'),
        Markup.callbackButton('📄 Propostas', 'propostas'),
        Markup.callbackButton('💌 Material publicitário', 'material')
      ]).extra())
});

bot.command('close', ({reply}) => reply('ok', Markup.removeKeyboard().extra()))
// bot.hears('🌈 Começando', comocomecar);
// bot.hears('👩‍🏫 Dicas', dicas);
// bot.hears('🗣 Argumentos', argumentos);
// bot.hears('📄 Propostas', argumentos);
// bot.hears('💌 Material publicitário', material);

bot.command('special', (ctx) => {
  return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
    return markup.resize()
      .keyboard([
        markup.contactRequestButton('Send contact'),
        markup.locationRequestButton('Send location')
      ])
  }))
})

bot.command('pyramid', (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    })
  ))
})

bot.command('simple', (ctx) => {
  return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
    Markup.keyboard(['Coke', 'Pepsi'])
  ))
})

bot.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})

bot.command('random', (ctx) => {
  return ctx.reply('random example',
    Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ]).extra()
  )
})

bot.command('caption', (ctx) => {
  return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
    Extra.load({ caption: 'Caption' })
      .markdown()
      .markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Plain', 'plain'),
          m.callbackButton('Italic', 'italic')
        ])
      )
  )
})

bot.hears(/\/wrap (\d+)/, (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      columns: parseInt(ctx.match[1])
    })
  ))
})

bot.action('Dr Pepper', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('plain', async (ctx) => {
  ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('Italic', 'italic')
  ]))
})

bot.action('italic', (ctx) => {
  ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('* Italic *', 'italic')
  ])))
})

bot.action(/.+/, (ctx) => {
  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

bot.startPolling()
