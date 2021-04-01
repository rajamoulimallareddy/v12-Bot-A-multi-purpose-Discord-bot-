const Command = require('../../Structures/Command');
const times = new Map();
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

const oo = await times.get(message.guild.id)
if(!oo || oo === 0){
player.setTrackRepeat(true)
message.channel.send({embed: {color:'#000034', description: "<a:TPRxYes:795237663682461717> Now looping the **track**"}})
times.set(message.guild.id, 1)
}
else if(oo === 1){
player.setQueueRepeat(true)
message.channel.send({embed: {color:'#000034', description: "<a:TPRxYes:795237663682461717> Now looping the **queue**"}})
times.set(message.guild.id, oo+1)
}
else if(oo === 2){
player.setTrackRepeat(false)
player.setQueueRepeat(false)
message.channel.send({embed: {color:'#000034', description: "<a:TPRxYes:795237663682461717> Looping is now **disabled**"}})
times.set(message.guild.id, 0)
}
}}
