module.exports = {
    name: 'pingbot',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}pingbot',

    execute(message) {
        message.channel.send(`Ping : **${message.client.ws.ping}ms** !`);
    },
};