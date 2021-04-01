const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'loops the current playing song',
			category: 'Music',
		        inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true

		});
	}

    
	async run(client, message, args) {
const bot = this.client;

            const player = bot.music.players.get(message.guild.id);
if(!message.member.voice.channel)return message.channel.send("You need to be in an voice channel to use that!")
if(!player || !player.queue.current)return
player.setTrackRepeat(false)
player.setQueueRepeat(false)
message.channel.send({embed: {color: '#000034', description: "<a:TPRxYes:795237663682461717> Looping is now **disabled**"}})
    }}
