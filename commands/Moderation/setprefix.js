const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const pre = require("../../models/prefix");
const mongoose = require("mongoose");

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['prefix'],

            description: 'This will change the prefix to mentioned prefix for this server!',

            category: 'Moderation',

            usage: 'Eg: >setprefix ^^'

        });

    }

    async run(client, message, args) {
    const res =  await pre.findOne({guildid: message.guild.id})
    let prefix = args.join(" ");
    let p;
    if(!res) p = this.client.prefix
    else p = res.prefix;
      const noperms = new Discord.MessageEmbed()
     .setColor("#000034")
      .setDescription(`<a:cause:776063776905625620> The prefix for this server is \`${p}\``)
        
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need `ADMINISTRATOR` permission to use this command");
        let newprefix = args.join(" ");
        if(!args[0]) return message.channel.send(noperms);
    else {
      pre.findOne({guildid: message.guild.id}).then(result => {
        let duck = new pre({
            _id: new mongoose.Types.ObjectId(),
            guildid: message.guild.id,
            prefix: prefix
          })
        let send = new Discord.MessageEmbed()
       // .setTitle(`${message.author.tag} used prefix command`)
        .setDescription(`<:DynoCheck:776062884131635210> Changed prefix to \`${newprefix}\``)
        .setTimestamp()
        .setColor("#010030")
       message.channel.send(send);
        if(!result || result == []) {
          duck.save().catch(console.error);
        }else{
          pre.deleteOne({guildid: message.guild.id}).catch(console.error)
          duck.save().catch(console.error)
        }
      })}
};}