module.exports = {
	name: 'ping',
	aliases:['pg'],
	description: 'Ping!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};