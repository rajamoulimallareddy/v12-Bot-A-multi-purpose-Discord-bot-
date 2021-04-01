const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: ['lockdown'],

			description: 'This will lock the channel and disable everyone to send messages!',

			category: 'Moderation',
    
      usage: '<prefix>+lock/lockdown `Example : >lock`'

		});

	}

	async run(client, message, args) {
        if (!this.client.lockit) this.client.lockit = [];
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(":x: | You don't have the permission to do that!");
  
    message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: false
      })
        message.channel.send(`<a:RX_opTICK:797888861844930560>  | **${message.author.username}** just locked the channel down.`);
    };

};