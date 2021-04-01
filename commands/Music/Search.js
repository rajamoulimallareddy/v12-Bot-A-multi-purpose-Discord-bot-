const Command = require('../../Structures/Command'),
Discord = require("discord.js")
const db = require ("quick.db")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'searches songs from youtube',
			category: 'Music',
		inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true

		});
	}

    
	async run(client, message, args) {
        const bot = this.client;
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        if (!args[0]) return message.channel.send("Please provide a song name or link to search.");
let j;
let cc = await db.get(`v_${message.guild.id}`)
if(!cc)j = 100
else j = cc
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: message.channel.id,
          selfDeafen: true,
volume: j
        });
player.connect()

        bot.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    message.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${bot.formatTime(res.tracks[0].duration, true)}\``);
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);
                    const embed = new Discord.MessageEmbed()
                        .setAuthor("Song Selection.", message.author.displayAvatarURL)
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setColor("#000034")
                        .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                    await message.channel.send(embed)
                            

 
                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1});

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        message.channel.send(`Enqueing \`${track.title}\` \`${bot.formatTime(track.duration, true)}\``);
                        if(!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = bot.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    message.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                    if(!player.playing) player.play()
                    break;
            }
        }).catch(err => message.channel.send(err.message))
    }
}
