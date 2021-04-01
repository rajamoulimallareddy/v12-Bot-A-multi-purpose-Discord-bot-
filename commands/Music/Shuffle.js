const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'plays a song from a platform',
			category: 'Music'
		});
	}

	async run(client, message, args) {
        const bot = this.client;
        const voiceChannel = message.member.voice.channel;

        const player = bot.music.players.get(message.guild.id);

        if(!player) return message.channel.send({embed: {description: "No song currently playing in this guild", color: "#000034"}})

        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");
player.queue.shuffle()
return message.react("🔁")
        //return message.channel.send("Successfully stopped the music.")
    }}
	