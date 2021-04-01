const Command = require('../../Structures/Command'),
      db = require("quick.db");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['v', "vol"],
			description: 'manage the volume of the current playing song',
			category: 'Music',
		inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true

		});
	}

    
	async run(client, message, args) {
        const bot = this.client;
let cc = db.get(`v_${message.guild.id}`);
if(!cc)cc = "100";
        const player = bot.music.players.get(message.guild.id);
  if(!args[0]) return message.channel.send({embed: {description: `**${cc}**%`}});
    else if(args[0]){
        if(!player) return message.channel.send({embed: {description: "No song currently playing in this guild", color: "#000034"}})

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel || voiceChannel.id !== player.voiceChannel) return message.channel.send("You need to be in a voice channel to adjust the volume.");


        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may only set the volume to 1-100");

        player.setVolume(Number(args[0]))
          db.set(`v_${message.guild.id}`, Number(args[0]))
        

        return message.channel.send({embed : {
          color: '#000034',
          description: `<a:TPRxYes:795237663682461717> Successfully set the volume to: \`${args[0]}\``
        }})
    }}}
