let keyboards = {
    main: {
        itens: ['🌈 Começando', '👩‍🏫 Dicas', '🗣 Argumentos', '📄 Propostas', '💌 Material publicitário'],
        oneTime: true
    }
};

module.exports = {
    get (id) {
        return keyboards[id];
    },
    add (id, keyboard) {
        keyboards[id] = keyboard;
    }
}
