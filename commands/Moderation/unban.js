const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: '',

            category: 'Moderation',

            usage: '<prefix> + unban + userID | Eg: >unban <UserID>'

        });

    }

    async run(client, message, args) {
      if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
      }
            
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
            }

      var member = message.mentions.members.first();
      let user = message.mentions.users.first();
      let userID = args[0]
      message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return 
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return
      message.guild.members.unban(bUser.user)
      if(bans.size == 0)if(bans.size == 0) return
      message.channel.send({ embed: {
        color: '#000034',
        description : `**${bUser.user.username}** is successfully unbanned form the server!`
      }
      })             

        });
};}
