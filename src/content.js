const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const keyboard = require('./keyboard');
const images = require('./images');

const { readFileSync } = require('fs');

const NUM_IMAGES = 2;

module.exports = {
    start ({ reply }) {
        return reply('Obrigado por participar, aqui você pode encontrar informações e conteúdos publicitários para campanha', keyboard.main());
    },
    comocomecar ( {replyWithMarkdown} ) {
        return replyWithMarkdown(readFileSync('./answers/comocomecar.md', 'utf8'));
    },

    randomLogoImage ({replyWithPhoto}) {
        let path = `./images/${Math.floor(Math.random()*NUM_IMAGES)+1}.jpg`;
        console.log(path, images.all());
        return replyWithPhoto(images.get(path)).then(m => images.addFromMessage(path, m));
    }
} 