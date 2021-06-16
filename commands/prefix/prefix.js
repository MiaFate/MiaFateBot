  
const Guild = require('../../database/Schematics/Guild')
module.exports = {

    //Information about command
    name: "setprefix",
    description: "Set the prefix for your server",
    usage: "setprefix [prefix]",
    enabled: true,
    aliases: ["prefix"],
    category: "Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,
  //Execute to command once the settings have been checked
  async execute(message, args){
    try{
        const data = await Guild.findOne({
            id: message.guild.id
        });

      if(!args[0]){
        let content = `${message.guild.name}'s prefix is:`+ "`" + data.prefix + "`" +`\n\nTo set up a new prefix use ` + "`" + data.prefix + "setprefix [prefix]`"
        return message.channel.send(content)
      }

      if(args[0].length > 5){
        let content = `Unable to assign prefix, make sure the prefix length is less than \`5 characters!\`\n\`\`\`${data.prefix}setprefix [prefix]\`\`\``
        return message.channel.send(content)
      }

      data.prefix = args[0];
      await data.save();

      let content = `Prefix has been successfully updated to ` + "`" + args[0] + "`"
      return message.channel.send(content)

    } catch (err){
      //Log error into the database
      //client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
      message.channel.send(`Ran into an error while executing ${message.client.command}}`)
      console.log(err)
    }

  },
};  