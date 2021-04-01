const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: [],

			description: 'This provides the ping of the bot',

			category: 'Utils'

		});

	}

	async run(client, message) {

	
    const msg = await message.channel.send('Pinging...');
    const latency = msg.createdTimestamp - message.createdTimestamp;

		const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];

		const response = choices[Math.floor(Math.random() * choices.length)];
    //msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(this.client.ws.ping)}ms\``);
  

	const embed = new MessageEmbed()

	.setAuthor(` | Pong 🏓`, message.author.avatarURL())

	.setDescription(`**Bot Latency:** \`${latency}ms\`\n**API Latency:** \`${Math.round(client.ws.ping)}ms\``)

	.setColor('#000034')

	.setTimestamp()

	msg.edit("", embed);
		}
};