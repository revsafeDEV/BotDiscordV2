// Importujemy potrzebne klasy z biblioteki discord.js
const { Client, GatewayIntentBits } = require('discord.js');

// Tworzymy nową instancję klienta Discord.js. 
// Określamy 'intents', czyli uprawnienia, jakich bot potrzebuje.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, // Uprawnienia do serwerów (guilds)
        GatewayIntentBits.GuildMessages, // Uprawnienia do odczytywania wiadomości na serwerach
        GatewayIntentBits.MessageContent, // Uprawnienia do odczytywania treści wiadomości
    ],
});

// Zdarzenie 'ready' uruchamia się, gdy bot pomyślnie się zaloguje.
client.on('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}!`);
    console.log(`Bot działa i jest gotowy do pracy!`);
});

// Zdarzenie 'messageCreate' uruchamia się za każdym razem, gdy na serwerze pojawi się wiadomość.
client.on('messageCreate', message => {
    // Sprawdzamy, czy wiadomość nie pochodzi od samego bota, żeby uniknąć pętli
    if (message.author.bot) return;

    // Prosty przykład reakcji na wiadomość '!ping'
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

// Bot loguje się do Discorda używając tokenu pobranego ze zmiennych środowiskowych.
// To kluczowe dla bezpieczeństwa, aby token nie był w kodzie!
client.login(process.env.TOKEN);
