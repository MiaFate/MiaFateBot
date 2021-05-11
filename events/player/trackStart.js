
module.exports = {
  name: "trackStart",
  playerOn: true,
  execute(message, track, queue, client) {
    try {
      message.channel.send(
        `- Now playing ${track.title} into ${message.member.voice.channel.name}...`
      );
      
    } catch (error) {
      console.log(error);
    }
    
  },
};
