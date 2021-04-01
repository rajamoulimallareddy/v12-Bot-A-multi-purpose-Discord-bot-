const Command = require('../../Structures/Command');
const xd = new Map();
const Discord = require('discord.js');
const ms = require('ms');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'This will add rate filter in Music',
			category: 'Music-Filters'
		});
	}
    
	async run(client, message, args) {
        const player = client.music.players.get(message.guild.id);
        const delay = ms => new Promise(res => setTimeout(res, ms));
		if (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off') {
			player.node.send({
				op: 'filters',
				guildId: player.guild.id || player.guild,
	timescale: { rate: 1.0 },          
			});
			const msg = await message.channel.send(`<a:loadin5g:776063953485955072> Reseting **rate**. This may take a few seconds...`);
			const embed = new Discord.MessageEmbed()
				.setDescription('Reset **rate**')
				.setColor("#000034");
			await delay(5000);
			return msg.edit('', embed);
		}

		if (isNaN(args[0])) return message.channel.send('Amount must be a real number.');
		if (args[0] < 0) return message.channel.send('Rate must be greater than 0.');
		if (args[0] > 10) return message.channel.send('Rate must be less than 10.');
		player.node.send({
            op: 'filters',
            guildId: player.guild.id || player.guild,
timescale: { rate: args[0] },          
        });
 
		const msg = await message.channel.send(`<a:loadin5g:776063953485955072> Setting rate to **${args[0]}x**. This may take a few seconds...`);
		const embed = new Discord.MessageEmbed()
			.setDescription(`Rate set to: **${args[0]}x**`)
			.setColor('#000034');
		await delay(5000);
		return msg.edit('', embed);
    }}