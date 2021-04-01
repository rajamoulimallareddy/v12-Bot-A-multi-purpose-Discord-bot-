const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: ['unlockdown'],

			description: 'This will unlock the channel and enable everyone to send messages!',

			category: 'Moderation',
    
      usage: '<prefix> + unlock/unlockdown `Example : >unlock`'
		});

	}

	async run(client, message, args) {
        if (!this.client.lockit) this.client.lockit = [];
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: | You don't have the permission to do that!");
  
    message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: true
      })
        message.channel.send(`<a:RX_opTICK:797888861844930560>  | **${message.author.username}** just locked the channel down.`);
    };

}