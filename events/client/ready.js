module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("_help - se vienen cositas pronto :sunglasses: ", { type: "PLAYING"})
		//client.user.setActivity('<activity>');
		//client.user.setStatus('asd');
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};