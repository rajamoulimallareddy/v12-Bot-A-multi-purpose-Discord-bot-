const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const pre = require('../../models/warns'); 
const mongoose = require("mongoose");
const discord = require("discord.js")
const config  = require("../../models/config")

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['warnings', 'warning'],

            description: 'This will warn the mentioned user',

            category: 'Moderation',

            usage: 'Eg: >warn @user For Spamming'

        });

    }

    async run(client, message, args) {
const xd = new MessageEmbed()
    .setTitle("**warnings**")
.setDescription(`**Description:** Get warnings for a user
**Usage:** >warnings [user]
**Example:** >warnings @Thunder`)
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user)return message.channel.send(xd)
    const d = new MessageEmbed()
    pre.findOne({name: "warns", serverid: message.guild.id, userid: user.user.id}).then(x => {
      if(x){
x.warnings.map(c => {
  d.setColor("#000034")
d.addField(``+`Moderator: `+c.moderator, `Reason: ` +c.reason)
d.setAuthor(`${x.warnings.length} Warnings found for  = ${client.users.cache.get(x.userid).tag}`, client.users.cache.get(x.userid).avatarURL())
})

message.channel.send(d)
}
      else message.channel.send({embed: {color: "#000034", description: ":x: There are no warnings."}})
})
}}