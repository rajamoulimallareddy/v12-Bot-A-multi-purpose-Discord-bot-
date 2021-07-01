const Command = require('../../Structures/Command');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require("ms");
client.giveawaysManager = require('discord-giveaways');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will start a giveaway for you!',

            category: 'Giveaway',

            usage: 'Eg: >gstart #channel 10m 1 Nitro'

        });

    }

    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
        }
        let giveawayChannel = message.mentions.channels.first();
        giveawayChannel = args[0];   
      
        if(!giveawayChannel){
            return message.channel.send(':x: You have to mention a valid channel!');
        }
      
        let giveawayDuration = args[1];
        if(!giveawayDuration || isNaN(ms(giveawayDuration))){
            return message.channel.send(':x: You have to specify a valid duration!');
        }
      
        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send(':x: You have to specify a valid number of winners!');
        }
      
        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize){
            return message.channel.send(':x: You have to specify a valid prize!');
        }
      let channelC  = giveawayChannel.split("<#")[1].split(">")[0]; 
      let channel = message.guild.channels.cache.get(channelC); 
        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayNumberWinners,
            hostedBy:  message.author ,
            messages: {
                giveaway: "<a:yeah:786145892797120532> <a:yeah:786145892797120532> **GIVEAWAY** <a:yeah:786145892797120532> <a:yeah:786145892797120532>",
                giveawayEnded: "<a:yeah:786145892797120532> <a:yeah:786145892797120532> **GIVEAWAY ENDED** <a:yeah:786145892797120532> <a:yeah:786145892797120532>",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: ":confetti_ball: Congratulations, :confetti_ball: {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false 
                }
            }
        });
      
        message.channel.send(`Giveaway started in ${giveawayChannel}!`);
	}
};
