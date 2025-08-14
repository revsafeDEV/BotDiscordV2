// Importujemy potrzebne klasy z biblioteki discord.js
const { Client, GatewayIntentBits } = require("discord.js");

// 🔹 KONFIGURACJA
// Zamiast wpisywać token i ID, pobieramy je ze zmiennych środowiskowych.
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID; // Bierzemy z .env, a nie z kodu.
const SERVER_TEXT = "miamirp.pl"; // Tekst do wyszukania w szczegółach aktywności

// 🔹 UTWORZENIE BOTA
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

client.once("ready", () => {
    console.log(`✅ Zalogowano jako ${client.user.tag}`);
    updateCount();
    setInterval(updateCount, 30000); // co 30 sekund
});

async function updateCount() {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.members.fetch(); // pobiera listę członków

    let activeCount = 0;
    let activePlayers = [];

    guild.members.cache.forEach(member => {
        if (!member.presence || !member.presence.activities.length) return;

        member.presence.activities.forEach(activity => {
            if (activity.name === "FiveM") {
                const details = (activity.details || "").toLowerCase();
                const state = (activity.state || "").toLowerCase();
                if (details.includes(SERVER_TEXT) || state.includes(SERVER_TEXT)) {
                    activeCount++;
                    activePlayers.push(member.user.tag);
                }
            }
        });
    });

    // Zmiana nazwy kanału
    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (channel) {
        channel.setName(`Aktywnych: ${activeCount}`).catch(console.error);
    }

    // Log w konsoli
    console.clear();
    console.log(`🔹 Graczy na ${SERVER_TEXT}: ${activeCount}`);
    if (activePlayers.length > 0) {
        console.log("Lista graczy:");
        activePlayers.forEach(player => console.log(`- ${player}`));
    }
}

client.login(TOKEN);
