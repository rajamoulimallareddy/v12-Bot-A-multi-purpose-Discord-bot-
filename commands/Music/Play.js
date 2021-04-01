const Command = require('../../Structures/Command');
const { getData, getPreview } = require('spotify-url-info');
const play = require('../../utils/music/play.js');
const db = require ("quick.db")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['p'],
			description: 'plays a song from a platform',
			category: 'Music'
		});
	}

	async run(client, message, args) {
if (!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send({embed: { color: "#000034", description: "I do not have permission to **send messages** in the guild!"}});
if (!message.guild.me.hasPermission("VIEW_CHANNEL")) return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **view** your voice channel!"}});
if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **connect** in your voice channel!"}});
if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **speak** in your voice channel!"}});

    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel)return message.channel.send({embed: {description: "You have to be connected to a voice channel before you can use this command!", color: "#000034"}})
if(!message.guild.channels.cache.get(voiceChannel.id))return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **view** your voice channel!"}});

          const permissions = voiceChannel.permissionsFor(client.user);
if (!permissions.has("VIEW_CHANNEL")) return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **view** your voice channel!"}});

        if (!permissions.has("CONNECT")) return message.channel.send({embed : {color: "#000034", description: "I do not have permission to **connect** in your voice channel!"}});
        if (!permissions.has("SPEAK")) return message.channel.send({embed: { color: "#000034", description: "I do not have permission to **speak** in your voice channel!"}});

if(!args[0])return message.react("👌")
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
player.connect();

    let query = args.join(" ");
    let q; 
const msg = await message.channel.send(` Searching for \`${args.join(' ')}\`...`);
    			let searchQuery;
		if (args[0].startsWith(client.config.spotifyURL)) {

const sL = 1000
			const data = await getData(args.join(' '));
			if (data.type == 'playlist' || data.type == 'album') {
					let songsToAdd = 0;
				if (player.queue.length == 0) { songsToAdd = Math.min(sL, data.tracks.items.length); }
				else {
					const totalSongs = player.queue.length + data.tracks.items.length;
					if (totalSongs > sL) songsToAdd = Math.min(sL - player.queue.length, data.tracks.items.length);
					else songsToAdd = data.tracks.items.length;
				}
				if (data.type == 'playlist') {
					for (let i = 0; i < songsToAdd; i++) {
						const song = data.tracks.items[i];
						play(client, message, msg, player, `${song.track.name} ${song.track.artists[0].name}`, true);
					}
				}
				else {
					await data.tracks.items.forEach(song => {
						play(client, message, msg, player, `${song.name} ${song.artists[0].name}`, true);
					});
				}
				const playlistInfo = await getPreview(args.join(' '));
				if (data.tracks.items.length != songsToAdd) msg.edit('', client.queuedEmbed(playlistInfo.title, args[0], null, songsToAdd, message.author).setFooter('You have reached the max amount of songs in the queue.'));
				else msg.edit('', client.queuedEmbed(playlistInfo.title, args[0], null, songsToAdd, message.author));
			}
			else if (data.type == 'track') {
				const track = await getPreview(args.join(' '));
				play(client, message, msg, player, `${track.title} ${track.artist}`, false);
			}
		}

            
else{
       const query = args.join(' ');
			play(client, message, msg, player, query, false);

}
  }
};
