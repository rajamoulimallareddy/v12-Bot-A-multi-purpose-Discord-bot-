const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ["next","n"],
			description: 'skip\'s the current song',
			category: 'Music',
	        	inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
	
		});
	}

	async run(client, message, args) {
		const bot = this.client;
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel) return message.channel.send("You need to be in a voice channel to use the skip command.");
		client.xd.set(message.guild.id, player.queue.current)
        player.stop();
    
    return message.react("👌")
    
    
    
    
        //return message.channel.send("Successfully skipped the current song")
    }}
