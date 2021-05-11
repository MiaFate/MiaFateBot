  
module.exports ={
    name: "botDisconnect",
  playerOn: true,
execute( message, track, queue,client){
    message.channel.send(` - Music stopped as i have been disconnected from the channel !`);
}
};