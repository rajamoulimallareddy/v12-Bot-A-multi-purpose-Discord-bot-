const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: ['purge'],

			description: 'This will clear the mentioned amount of message',

			category: 'Utils'

		});

	}

	async run(client, message, args) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('You have Lack of Perms!');
    
    let deleteAmount;

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a number only!') }

    if (parseInt(args[0]) > 100) {
        return message.reply('You can only delete 100 messages at a time!')
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);
    message.reply(`**Successfully** Purged **${deleteAmount}** Messages.`)
    }
};