const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const AmeAPI = require('amethyste-api');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides qrcode image',

            category: 'Images'

        });

    }

    async run(client, message, args) {
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author;
        let text = args.join(" ");
        if(!text){
            return message.channel.send("Please specify something to convert to qrcode!");
        }
    
        let pleaseWait = await message.channel.send("Please Wait...");
        
        let embed = new Discord.MessageEmbed()
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.replace(new RegExp(" ", "g"), "%20")}`)
            .setColor("#000034");

        message.channel.send(embed).then(() => pleaseWait.delete()) 
	}
};