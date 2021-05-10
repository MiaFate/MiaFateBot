const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot is ready as ${client.user.tag}`);
});

//argumentos
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  // ...
  // Using the new `command` variable, this makes it easier to manage!
  // You can switch your other commands to this format as well
  if (command === "ping") {
    message.channel.send("Pong.");
  } else if (command === "args-info") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    } else if (args[0] === "foo") {
      return message.channel.send("bar");
    }
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    message.channel.send(`First argument: ${args[0]}`);
  } else if (command === 'kick') {
    // Grab the "first" mentioned user from the message
    // This will return a `User` object, just like `message.author`
    if (!message.mentions.users.size) {
        return message.reply('you need to tag a user in order to kick them!');
    }
    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
}
else if (command === 'avatar' ){

    if (!message.mentions.users.size) {
        return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
    }
    
    
    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
    });
    
    // Send the entire array of strings as a message
    // By default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);

}
  
});

//receiving the message
client.on("message", async (message) => {
  console.log(message.content);

  //Reply a un mensaje
  if (message.content === "chau") {
    try {
      message.reply("duren :clown: :thumbup:");
    } catch (error) {}
  }

  //responder a un mensaje en concreto etiquetando al autor
  if (message.content === "hello") {
    message.channel.send(`hola ${message.author}`);
  }

  if (message.content.includes(`${prefix}hola`)) {
    message.channel.send("QUE HACES?");
  }

  //comandos que inician con el prefijo + el comando
  if (message.content.startsWith(`${prefix}Beep`)) {
    message.channel.send("Boop");
  }

  if (message.content === `${prefix}server`) {
    message.channel.send(
      `El nombre del server es: ${message.guild.name}\nTotal de miembros: ${message.guild.memberCount}\nFue crado el: ${message.guild.createdAt}\nLa region del server es: ${message.guild.region}`
    );
  }

  //comando para borrar mensajes
  /*
  if (message.content === "!clear") {
    try {
      const fetched = message.channel.messageCollector({ limit: 5 });

      message.channel.bulkDelete(fetched);
      console.log("se eliminoasd" + fetched);
    } catch (error) {
      console.log(error);
    }
  }
  */
  if (message.content === `${prefix}clear`) {
    const fetched = await message.channel.messages.fetch({ limit: 100});
    message.channel.bulkDelete(fetched);
    
  }
});

client.login(token);
