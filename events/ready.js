module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("se vienen cositas pronto :sunglasses: ", { type: "PLAYING"})
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};