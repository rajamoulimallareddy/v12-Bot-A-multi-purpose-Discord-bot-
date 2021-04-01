const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const AmeAPI = require('amethyste-api'),
      Discord = require("discord.js"),
      fetch = require("node-fetch");
module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides tweet image',

            category: 'Images'

        });

    }

    async run(client, message, args) {
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author;

        let text = args.slice(1).join(" ");
        if(!user)return message.channel.send("Wrong Usage!\nUsage: `,tweet <user> <text-to-tweet>`")
        if(!text)return message.channel.send("mention something to tweet".toProperCase())
            const m = await message.channel.send(`Tweeting...`);
        
            try {
              let res = await fetch(
                encodeURI(
                  `https://nekobot.xyz/api/imagegen?type=tweet&username=${user}&text=${text}`
                )
              );
              let json = await res.json();
              let attachment = new Discord.MessageAttachment(json.message, "tweet.png");
              await message.channel.send(`New Tweet By ` + user, attachment);
              m.delete();
            } catch (e) {
              console.log(e);
              m.edit("Oops! I can't tweet");
            }
	}
};