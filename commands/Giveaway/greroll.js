const Command = require('../../Structures/Command');
const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will reroll the winners',

            category: 'Giveaway',

            usage: 'Eg: >greroll <msgID>'

        });

    }

    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
        }
    
        if(!args[0]){
            return message.channel.send(':x: You have to specify a valid message ID!');
        }
    
        let giveaway = 
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    
        if(!giveaway){
            return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
        }
    
        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('Giveaway rerolled!');
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                message.channel.send('This giveaway is not ended!');
            } else {
                console.error(e);
                message.channel.send('An error occured...');
            }
        });
    
	}
};