const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const pre = require('../../models/warns'); 

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['clearwarns'],

            description: 'This will warn the mentioned user',

            category: 'Moderation',

            usage: 'Eg: >warn @user For Spamming'

        });

    }

    async run(client, message, args) {
if (message.mentions.users.first() ) { 
    const user =
      message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if(user){
      pre.findOne({name: "warns", serverid: message.guild.id, userid: user.user.id}).then(x => {
                if(!x)return message.channel.send({embed: {color: "000034",description: `**No warnings found for ${user.user}**`}})

         else if(x){
         
              message.channel.send({embed: {color: "#000034", description: `**Cleared ${x.warnings.length} warnings for ${user.user.tag}**.`}}).then(() => {
                 x.deleteOne() 
        })
        }
      })
    }
}}
};