const Command = require('../../Structures/Command');
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const paginate = require('../../utils/music/paginate.js');
const getQueueDuration = require('../../utils/music/getQueueDuration.js');
const formatDuration = require('../../utils/music/formatDuration.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["playlist", "q"],
			description: 'shows the song playlist for the guild',
			category: 'Music',
		        inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
	
		});
	}

    
	async run(client, message, args) {
		const player = client.music.players.get(message.guild.id);

		const { title, requester, duration, uri } = player.queue.current;

		const parsedDuration = formatDuration(duration);
		const parsedQueueDuration = formatDuration(getQueueDuration(player));
		let pagesNum = Math.ceil(player.queue.length / 10);
		if(pagesNum === 0) pagesNum = 1;

		let index = 1;
		const queueStr = `${player.queue.slice(1, 10).map(song => `**${index++}. **${song.title} [<@${!song.requester.id ? song.requester : song.requester.id}>]`).join('\n')}`;
		const queueEmbed = new Discord.MessageEmbed()
			.setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL())
			.setColor("#000034")
			.setDescription(`**Now Playing**: ${title} [<@${!requester.id ? requester : requester.id}>].\n\n**Up Next**:\n${queueStr}`)
			.setFooter(`Page 1/${pagesNum} | ${player.queue.length} song(s) | ${parsedQueueDuration} total duration`);

		if (player.queue.length <= 10) return message.channel.send(queueEmbed);

		if (player.queue.length > 10) {
			if(args[0]) {
				if (isNaN(args[0])) return message.channel.send('Page must be a number.');
				if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);

				let index2 = args[0] * 10 - 10;
				const pageStart = args[0] * 10 - 10;
				const pageEnd = args[0] * 10;

				const queueStr2 = `${player.queue.slice(pageStart, pageEnd).map(song => `**${index2++}.** ${song.title} [<@${!song.requester.id ? song.requester : song.requester.id ? song.requester : !song.requester.id ? song.requester : song.requester.id}>]`).join('\n')}`;
				const queueEmbed2 = new Discord.MessageEmbed()
					.setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL())
					.setColor("#000034")
					.setDescription(`**Now Playing:** [${title}](${uri}) \`[${parsedDuration}]\` • <@${!requester.id ? requester : requester.id}>.\n\n**Up Next**:\n${queueStr2}`)
					.setFooter(`Page ${args[0]}/${pagesNum} | ${player.queue.length} song(s) • ${parsedQueueDuration} total duration`);
				return message.channel.send(queueEmbed2);
			}
			else {
				const pages = [];
				let n = 1;
				for (let i = 1; i < pagesNum; i++) {
					const str = `${player.queue.slice(i * 10, i * 10 + 10).map(song => `**${n++}.** ${song.title} [<@${!song.requester.id ? song.requester : song.requester.id}>]`).join('\n')}`;
					const embed = new Discord.MessageEmbed()
						.setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL())
						.setColor("#000034")
						.setDescription(`**Now Playing**: ${title} [<@${!requester.id ? requester : requester.id}>].${(player.queue.length>1) ? `\n\n**Up Next**:\n${str}` : ""}`)
						.setFooter(`Page ${i + 1}/${pagesNum} | ${player.queue.length} song(s) | ${parsedQueueDuration} total duration`);
					pages.push(embed);
					if(i == pagesNum - 1) paginate(client, message, pages, ['◀️', '▶️'], 120000, player.queue.length, parsedQueueDuration);
				}
			}
		}
    }}
