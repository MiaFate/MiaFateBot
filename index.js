require('dotenv').config()
const fs = require("fs");

const Discord = require("discord.js");
const { prefix } = require("./config.json");

const client = new Discord.Client();

client.prefix = prefix;
//comandos
client.commands = new Discord.Collection();
//cooldowns
client.cooldowns = new Discord.Collection();

//musica

const { Player } = require("discord-player");

// Create a new Player (you don't need any API Key)
const player = new Player(client);

// To easily access the player
client.player = player;


const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

//eventos
const eventFolders = fs.readdirSync("./events");

for (const folder of eventFolders) {
  const eventFiles = fs
    .readdirSync(`./events/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(`./events/${folder}/${file}`);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else if (event.playerOn) {
      client.player.on(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}



client.login(process.env.token);
