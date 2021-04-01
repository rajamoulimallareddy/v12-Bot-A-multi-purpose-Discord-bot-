const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: [],

			description: 'This provides invte link of the bot',

			category: 'Utils'

		});

	}

	async run(client, message) {
  let invite = "https://top.gg/bot/756009470324113441";
  message.channel.send("<a:RX_opTICK:797888861844930560> **| The invite was sent in your DMs.**");
    return message.author.send(invite);
	}

};