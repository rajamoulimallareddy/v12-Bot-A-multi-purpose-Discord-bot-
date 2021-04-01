const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: [],

			description: 'This will put you on afk',

			category: 'Utils'

		});

	}

	async run(client, message, args) {
        let reason;
if(!args[0]) reason = "AFK"
else reason = args.join(" ");

this.client.data.memberData.afk = reason;
this.client.data.memberData.afktime = new Date(Date.now());
this.client.data.memberData.save();
message.channel.send(`${message.author} I set you AFK: ${reason}`)
    }
};