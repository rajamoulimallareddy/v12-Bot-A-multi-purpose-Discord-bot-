const Command = require('../../Structures/Command');

module.exports = class Replay extends Command {
	constructor(...args) {
		super(...args, {
			name: 'replay',
            category: "Music",
			description: 'Starts the song from the beginning.',
			cooldown: '4',
			inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
		});
	}
	async run(client ,message, args) {
    const player = client.music.players.get(message.guild.id);
    if(!player || !player.queue.current)return message.channel.send("No songs are playing")
		player.seek(0);
		return message.react("🔁")
	}
};
