let admin = require('firebase-admin');

let serviceAccount = require('../firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);


let mensagens = db.collection('mensagens');


const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const images = require('./images');
const keyboards = require('./keyboards');

const bot = new Telegraf(process.env.BOT_TOKEN);

/* Disable logs on production to prevent exposing
 * user's messages on Now.sh public log
 */
bot.use(Telegraf.log())

const ERR_NOT_FOUND = "Infelizmente não tenho resposta para isso, mas boa campanha!";
const ERR_NO_MESSAGE = "Estou tendo problemas para te responder, tente outra coisa por favor.";

function getFirebaseURL (name) {
  return `https://firebasestorage.googleapis.com/v0/b/elenuncabot.appspot.com/o/${name}?alt=media`;
}

async function getImage (reference) {
  let image = images.get(reference.id);
  if (image) return image;
  let doc = await reference.get();
  let file_id = doc.data().file_id;
  return file_id ? images.add(reference.id, doc.data().file_id) : getFirebaseURL(doc.data().nome);
}

async function getKeyboard (reference) {
  let keyboard = keyboards.get(reference.id);
  if (keyboard) return keyboard;
  let doc = await reference.get();
  keyboards.add(reference.id, doc.data());
  return doc.data();
}

function saveImage (reference, message) {
  let file_id = images.addFromMessage(reference.id, message);
  return file_id ? reference.update({file_id}) : Promise.resolve();
}

function answer (tipo, ctx) {
  return mensagens.where(tipo, '==', ctx.message.text.toLowerCase()).get()
  .then(documentoMensagem => {
    if (documentoMensagem.docs.length === 0)
      return ctx.reply(ERR_NOT_FOUND);

    let conteudo = documentoMensagem.docs[0].data();
    
    return Promise.all([
      conteudo.imagem ? getImage(conteudo.imagem) : Promise.resolve(),
      conteudo.teclado ? getKeyboard(conteudo.teclado) : Promise.resolve()
    ]).then(([imagem, teclado]) => {
      let markup = teclado ? Markup.keyboard(teclado.itens).oneTime(!!teclado.oneTime).resize().extra() : undefined;
      switch (conteudo.tipo) {
        case 'markdown':
          return ctx.replyWithMarkdown(conteudo.mensagem || ERR_NO_MESSAGE, markup);
        case 'photo':
          if (!imagem) return ctx.reply(ERR_NO_MESSAGE, markup);
          return ctx.replyWithPhoto(imagem, markup).then(m => saveImage(conteudo.imagem, m));
        case 'location':
          return ctx.replyWithLocation(conteudo.latitude, conteudo.longitude, markup);
        default:
          return ctx.reply(conteudo.mensagem || ERR_NO_MESSAGE, markup);
      }
    });
  });
}


// bot.command('start', content.start);
bot.command('fecharteclado', ctx => ctx.reply('Ok', Markup.removeKeyboard().extra()));

bot.hears(/^\/.+/, ctx => answer('comando', ctx));
bot.hears(/^[^/].+/, ctx => answer('gancho', ctx));

// bot.on('sticker', function ({replyWithPhoto}) {
//     let path = `./images/${Math.floor(Math.random()*NUM_IMAGES)+1}.jpg`;
//     console.log(path, images.all());
//     return replyWithPhoto(images.get(path)).then(m => images.addFromMessage(path, m));
// });

bot.startPolling();

console.log('\n> EleNuncaBot online!\n');


// Stub server to prevent bot from being shutdowned on Now.sh
require('http').createServer(function (req, res) {
    res.write('#EleNao #EleNunca');
    res.end();
}).listen(8080);
