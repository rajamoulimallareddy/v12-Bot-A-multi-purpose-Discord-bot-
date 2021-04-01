const Event = require('../Structures/Event');
const config = require('../config.json');
const ThunderClient = require('../Structures/ThunderClient');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {        super(...args, {

            once: true

        });

    }

    
  async run(guild) {
    const client = this.client;

    
    const c = client.channels.cache.get('822793769904111637');
    const Tyson = new MessageEmbed()
    .setTitle(":broken_heart: | Thunder Removed")
    .addField("Server name :", guild.name) 
    .addField("Owner id :", guild.owner.id)
    .addField("Owner name :", guild.owner.user.username)
    .addField("Server id :", guild.id)
    .addField("Number of members :", guild.memberCount)
    .setColor('#010030')
    .setTimestamp(); 
    return c.send(Tyson)
    }

};