module.exports = {
    name: 'pingbot',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}pingbot',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms** !`);
    },
};