const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const s = require('../../events/messageDelete');
const ms = require('ms');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This snipes the recent delete message in chat',

            category: 'Fun',

            usage: 'Eg: >snipe'

        });

    }

    async run(client, message, args) {
    let c = client.snipes.get(message.guild.id); 
    if (!c) return message.channel.send(':x: There is nothing to snipe!');
    const SnipeEmbed = new MessageEmbed()
    .setAuthor(c.author, c.avatar)
    .setDescription(c.content)
    .setColor('#010030')
    .setFooter('Get Sniped')
    .setTimestamp();
    message.channel.send(SnipeEmbed);
};
  }