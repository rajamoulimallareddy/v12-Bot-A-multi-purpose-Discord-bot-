const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides the ping of the bot',

            category: 'Moderation',
      
            usage: '<prefix> + message + announcement channel(optional) | Exapmle :`>say Hi @everyone #chat`'

        });

    }

    async run(client, message, args) {
      const Discord = require('discord.js');
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(":x: You haven't the permission to execute this command!");

        let msg;
        let textChannel = message.mentions.channels.first() || message.guild.channels.cache.get()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        }
        

        const embed = new Discord.MessageEmbed()
        .setColor("#000034")
        .setDescription(args.join(" ")) 
        .setFooter(`${message.author.displayAvatarURL( { dynamic: true } )}`)
        .setTimestamp()

        message.channel.send(embed);

    }
};