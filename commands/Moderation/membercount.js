const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['mc'],

            description: 'This will count the server members',

            category: 'Moderation'

        });

    }

    async run(client, message, args) {
    let servermemberCount = message.guild.memberCount;
    const embed = new MessageEmbed()
    .setTitle('**Members**')
    .setDescription(`**${servermemberCount}**`)
    .setColor("#000034")
    .setTimestamp()
    message.channel.send(embed)
}
};