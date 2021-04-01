const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const {earrape, normal} = require('../../config/volume');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['veryloud', 'hell', 'loud','earrape'],
			description: 'This will add too loud sound with bad quality',
			category: 'Music-Filters',
            inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true
		});
	}
    
	async run(client, message, args) {
        const player = client.music.players.get(message.guild.id);
		const delay = ms => new Promise(res => setTimeout(res, ms));
		if (args[0] && args[0] == 'reset' ||args[0] &&  args[0] == 'off') {
			player.setVolume(normal);
			player.clearEQ()
			const msg = await message.channel.send(`<a:loadin5g:776063953485955072> Reseting **earbust**. This may take a few seconds...`);
			const embed = new Discord.MessageEmbed()
				.setDescription('Reset **earbust**')
				.setColor("#000034");
			await delay(5000);
			return msg.edit('', embed);
		}
		
		if (!args[0]) {

		player.setVolume(earrape);
		player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 1 })));

		const embed = new Discord.MessageEmbed()
			.setDescription('**Earbust** is Enabled.')
			.setColor('#000034');
		return message.channel.send(embed);
		}
 } }