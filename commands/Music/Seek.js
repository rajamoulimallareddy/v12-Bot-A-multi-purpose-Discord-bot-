const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');
const db = require('quick.db');
const ms = require("ms");
const util = require("./../../utils.js");
const durationPattern = /^[0-5]?[0-9](:[0-5][0-9]){1,2}$/;
const secsPattern = /^(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'This will Skips to a timestamp in the song.',
            category: 'Music',
            usage: 'Eg; >seek 10s',
            inVoiceChannel: true,
            sameVoiceChannel: true,
            playing: true

        });
    }
    
    async run(client, message, args) {
		const bot = this.client;
        const duration = args[0];
        if (durationPattern.test(duration)){
            const player = this.client.music.players.get(message.guild.id);
            const durationMs = util.durationToMillis(duration);                                      
            if (durationMs >  player.queue.current.duration)  return message.channel.send({embed: {color: "#000034", description:"The duration you provide exceeds the duration of the current track."}});

            player.seek(durationMs);
            
        const parsedDuration = this.client.formatDuration(player.position);
        return message.channel.send({embed: {color: "#000034", description: `Seeked to \`${parsedDuration}\``}});
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
            duration
          );
        if (match[2]){
            const player = this.client.music.players.get(message.guild.id);
            const durationMs = ms(duration);                                      
            if (durationMs >  player.queue.current.duration)  return message.channel.send({embed: {color: "#000034", description:"The duration you provide exceeds the duration of the current track."}});

            player.seek(durationMs);
            
        const parsedDuration = this.client.formatDuration(player.position);
        return message.channel.send({embed : {
            color: '#000034',
            description: `Seeked to ${parsedDuration}`
          }});

        }
        else {
        if(isNaN(args[0])) return message.reply(`Invalid number. Please provide a number in seconds.\nCorrect Usage: \`${prefix}seek <seconds>\``);

        const player = this.client.music.players.get(message.guild.id);
        if(args[0] * 1000 >= player.queue.current.duration || args[0] < 0) return message.channel.send('Cannot seek beyond length of song.');
        player.seek(args[0] * 1000);

        const parsedDuration = this.client.formatDuration(player.position);
        return message.channel.send({embed : {
            color: '#000034',
            description: `<a:TPRxYes:795237663682461717> Seeked to ${parsedDuration}`
          }});
        }
}}