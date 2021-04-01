const Command = require('../../Structures/Command')
const rewindNum = 10;

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'This will rewind the mentioned <seconds> in current song!',
			category: 'Music',
            usage: 'Eg: >rewind 10',
            inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true
		});
	}
	async run(client, message, args) {
		const player = client.music.players.get(message.guild.id);
		const parsedDuration = this.client.formatDuration(player.position);
		if(args[0] && !isNaN(args[0])) {
			if((player.position - args[0] * 1000) > 0) {
				player.seek(player.position - args[0] * 1000);
				return message.channel.send({embed: {
					color: '#000034',
					description: `Rewinding to \`${parsedDuration}\``
				}});
			}
			else {return message.channel.send('Cannot rewind beyond 00:00.');}
		}
		else if(args[0] && isNaN(args[0])) {return message.reply(`Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``);}

		if(!args[0]) {
			if((player.position - rewindNum * 1000) > 0) {
				player.seek(player.position - rewindNum * 1000);
				return message.channel.send({embed: {
					color: '#000034',
					description: `<a:TPRxYes:795237663682461717> Rewinding to \`${parsedDuration}\``
				}});
			}
			else {
				return message.channel.send('Cannot rewind beyond 00:00.');
			}
		}
	}
};