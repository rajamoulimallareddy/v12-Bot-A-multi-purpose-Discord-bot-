const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['av','icon','pfp'],

            description: 'This provides the avatar of mentioned user',

            category: 'Fun',

            usage: 'Eg: >avatar @user'

        });

    }

    async run(client, message, args) {
  let user;

  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user;
  } else {
    user = message.author;
  }

  let avatar = user.displayAvatarURL({size: 4096, dynamic: true});

  const tyson = new MessageEmbed()
  .setTitle(`${user.tag}'s avatar`)
  .setDescription(`[**Avatar URL**](${avatar})`)
  .setColor('#000034')
  .setImage(avatar)
  .setTimestamp()

  return message.channel.send(tyson)
}}