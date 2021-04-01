const Command = require('../../Structures/Command');
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['dc', 'leave'],
            description: 'plays a song from a platform',
            category: 'Music'
        });
    }

    async run(client, message, args) {
        const bot = client;
        const voiceChannel = message.member.voice.channel;

        const player = bot.music.players.get(message.guild.id);

        if(!player) return message.channel.send({embed: {description: "**<a:cause:776063776905625620> No song currently playing in this guild**", color: "#000034"}})


        if(!voiceChannel || voiceChannel.id !== player.voiceChannel) return message.channel.send("You need to be in a voice channel to use the leave command.");

        player.destroy();
return message.react("👋")
    }}
    