const Markup = require('telegraf/markup')

module.exports = {
    main () {
        return Markup
            .keyboard(['🌈 Começando', '👩‍🏫 Dicas', '🗣 Argumentos', '📄 Propostas', '💌 Material publicitário'])
            .oneTime()
            .resize()
            .extra()
    },
    close () {
        return Markup.removeKeyboard().extra();
    }
} 