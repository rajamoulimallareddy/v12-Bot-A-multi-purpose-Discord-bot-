const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'pauses the current song',
			category: 'Music'
		});
	}

    
	async run(client, message, args) {
        const bot = this.client;
    const player = bot.music.players.get(message.guild.id);

    if (!player) return message.channel.send("No song/s currently playing in this guild.");

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel || voiceChannel.id !== player.voiceChannel) return message.channel.send("You need to be in a voice channel to pause music.");

    

    player.pause(player.playing);
    return message.channel.send({embed : {
        color: '#000034',
        description: `Player is now ${player.playing ? "resumed" : "paused"}.`
      }})
    }}
