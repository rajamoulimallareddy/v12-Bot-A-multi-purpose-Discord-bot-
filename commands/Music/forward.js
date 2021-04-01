const { MessageFlags } = require('discord.js');
const Command = require('../../Structures/Command')
const fastForwardNum = 10;

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'This will forward a song (default 10 seconds)!',
			category: 'Music',
            usage: 'Eg: >forward <seconds>',
            inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true
		});
	}
	async run(client, message, args) {
        const player = client.music.players.get(message.guild.id);

        if(args[0] && !isNaN(args[0])) {
            if ((player.position + args[0] * 1000) < player.queue.current.duration){
                player.seek(player.position + args[0] * 1000);
                const parsedDuration = client.formatDuration(player.position);
                return message.channel.send({embed : {
                    color: '#000034',
                    description: `Fast-forwarded to \`${parsedDuration}\``
                }});
            }
            else { return message.channel.send(`Cannot forward beyond the song\'s duration.`); }
        }
        else if (args[0] && isNaN(args[0])) { return message.channel.send({ embed : {
            color: '#000034',
            description: `Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``
        }}); }

        if (!args[0]) {
			if ((player.position + fastForwardNum * 1000) < player.queue.current.duration) {
				player.seek(player.position + fastForwardNum * 1000);
				const parsedDuration = client.formatDuration(player.position);
                return message.channel.send({embed : {
                    color: '#000034',
                    description: `Fast-forwarded to \`${parsedDuration}\``
                }})
			}
            else {
				return message.channel.send({ embed : {
                    color: '#000034',
                    description: `Invalid argument, must be a number.\nCorrect Usage: \`>forward <seconds>\``
                }});
			}
        }
	}
};