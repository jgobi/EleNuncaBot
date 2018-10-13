# EleNuncaBot
Bot do Telegram para difundir informações e materiais verídicas sobre o candidado a presidente Jair Bolsonaro


# Guia para desenvolvimento

1. Instale o Node v8.12.0
2. Instale o `yarn` executando num terminal `$ npm i -g yarn`
3. Na pasta do projeto, execute `yarn` para instalar suas dependências

# Guia de execução

1. Defina uma variável de ambiente chamada `BOT_TOKEN` com o token do bot do Telegram.
2. Cria um arquivo chamado `firebase-key.json` na raiz deste repositório contendo a chave privada do Firebase.
3. Execute `yarn start`

## OBS

Eu costumo criar um arquivo `BOT_TOKEN` na raiz do repositório e, na hora de executar o robô, eu executo `BOT_TOKEN=$(cat BOT_TOKEN) yarn start`. ;)