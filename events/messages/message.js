module.exports = {
  name: "message",
  async execute(message, client) {
    const config_prefix = process.env.prefix;
    const Discord = require("discord.js");
    
    //Get guild database
    let guildDB = await client.data.getGuildDB(message.guild.id).catch((err)=>console.log(err));

    //Get prefix from guild else get from config file
    let prefix = !guildDB.prefix ? config_prefix : guildDB.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    //
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;
    //

    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply("I can't execute that command inside DMs!");
    }

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.reply("You can not do this!");
      }
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.channel.send(reply);
    }

    /*cooldowns*/

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //cooldowns-end

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
    }
  },
};
