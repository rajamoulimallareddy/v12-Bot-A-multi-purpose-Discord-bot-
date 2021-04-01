const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['setnickname', 'nickname'],

            description: 'This provides the ping of the bot',

            category: 'Moderation',
      
            usage: '<prefix> + setnickname + user `Example : >setnickname <@!user> <nickname>`'

        });

    }

    async run(client, message, args) {
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR", "MANAGE_NICKNAME"])) {
    return message.channel.send("You can't use this command!")
  }
  
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  args[0] = user
  if (!user) return message.channel.send("You need to mention the user!");
  
  let nick = args.slice(1).join(" ");
  if (!nick) return message.channel.send("You need to input the nickname!");
  
  let member = message.guild.members.cache.get(user.id);
  if(user.id === message.guild.ownerID) return message.reply(`**I can't change this user's name , May this user have higher role then me or i have \`Manage_Mickname\` power ?.**`)
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR", "MANAGE_NICKNAME"])) {
    return message.channel.send("You can't use this command!")
  }
  member.setNickname(nick).catch(err => message.channel.send(`I am Unable To change this user's name`));
  return message.channel.send(`Successfully changed **${user.tag}** nickname to **${nick}**`);
}
};
