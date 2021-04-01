const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will resume the music',

            category: 'Music',

            usage: '<prfix> + resume | Eg: >resume'
        });

    }

    async run(client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no player for this guild.");
        
        const { channel } = message.member.voice;
        
        if (!channel) return message.reply("you need to join a voice channel.");
        if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
        if (!player.paused) return message.reply("The player is already resumed.");
        
        player.pause(false);
        const e = new MessageEmbed()
        .setTitle(`${client.emojis.cache.find(x => x.name === 'ratio_music_play')} Resumed the player`)
        .setColor('#010030')
        return message.reply(e);
};}