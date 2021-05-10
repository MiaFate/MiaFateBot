  
module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',

    execute(message) {
        if (!message.member.voice.channel) return message.channel.send(` - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` - You are not in the same voice channel !`);

        if (!message.client.player.getQueue(message)) return message.channel.send(` - No music currently playing !`);

        const success = message.client.player.skip(message);

        if (success) message.channel.send(` - The current music has just been **skipped** !`);
    },
};