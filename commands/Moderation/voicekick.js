const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['vckick'],

            description: 'This will kick the mentioned user from voice chat/vc',

            category: 'Moderation',

            usage: 'Eg: >voicekick @user'

        });

    }

    async run(client, message, args) {
        if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
    return message.channel.send(`I Don't Have **Proper Permissions** To Use This Command!`) 
   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if (!member) 
    return message.channel.send( `**Please Mention User That You Want To Kick From Voice Channel!**` ); 
   let { channel } = member.voice; 
   if (!channel) return message.channel.send(`User Is Not In Any Voice Channel!`); 
   member.voice.kick();
   const embed = new MessageEmbed()
   .setTitle(`**Voice kicked**`)
   .setDescription(`**${member.user.username}** Has Been Kicked From Voice Channel!`)
   .setColor('#000034')
   .setTimestamp()
    message.channel.send(embed)
};}