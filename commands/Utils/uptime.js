const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: [],

			description: 'This provides the Uptime of the bot',

			category: 'Utils'

		});

	}

	async run(client, message) {
    const embed = new MessageEmbed()
	  .setTitle('Thunder\'s Uptime')
	  .setDescription(`My uptime is \`${ms(this.client.uptime, { long: true })}\``)
	  .setColor('#000034')
		  message.channel.send(embed);
	}

};