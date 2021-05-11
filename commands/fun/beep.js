  
module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute(message) {
		message.channel.send(`Boop. \<:Bizkey:764230468425744425> `);
	},
};