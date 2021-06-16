const guildsDB = require("./Schematics/Guild.js");

module.exports.getGuildDB = async function (guildID) {
  let guildDB = await guildsDB.findOne({ id: guildID });

  if (guildDB) {
    return guildDB;
  } else {
    guildDB = new guildsDB({
      id: guildID,
    });
    await guildDB.save().catch((err) => console.log(err));
    return guildDB;
  }
};
