const { MessageFlags } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Plays the previous song in the queue!',
			category: 'Music',
            usage: 'Eg: >previous',
            inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true
		});
	}
	async run(client, message, args) {
        const player = client.music.players.get(message.guild.id);
		const previous = client.xd.get(message.guild.id);
       // if(!previous) return message.channel.send('There are no previous songs.');
        player.queue.unshift(previous);
        message.channel.send({embed: {
			color: '#000034',
			description: `**Playing the previous song **`
		}});
        player.stop();
	}
};