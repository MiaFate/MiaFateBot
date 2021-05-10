module.exports = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}resume',

    execute(message) {
        if (!message.member.voice.channel) return message.channel.send(` - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(` - You are not in the same voice channel !`);

        if (!message.client.player.getQueue(message)) return message.channel.send(` - No music currently playing !`);

        if (!message.client.player.getQueue(message).paused) return message.channel.send(` - The music is already playing !`);

        const success = message.client.player.resume(message);

        if (success) message.channel.send(` - Song ${message.client.player.getQueue(message).playing.title} resumed !`);
    },
};