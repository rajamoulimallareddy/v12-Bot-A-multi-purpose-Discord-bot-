const Command = require('../../Structures/Command');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const AmeAPI = require('amethyste-api');
const { Canvas } = require("canvas-constructor")
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const fetch = require("node-fetch")

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides delete image',

            category: 'Images'

        });

    }

    async run(client, message, args) {
        const pic = await fetch("https://cdn.discordapp.com/attachments/531522253071056910/691242512622289026/delete-1.png")
        const background = await pic.buffer();
        const imageUrlRegex = /\?size=2048$/g;
        const member = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
        const result = await fetch(member.avatarURL({format: "png", dynamic: true}).replace(imageUrlRegex, "?size=128"));
      if (!result.ok) throw new Error("Failed to get the avatar.");
      const avatar = await result.buffer();
        
       const del = new Canvas(748, 356)
    .setColor("#000034")
    .addImage(background, 0, 0, 748, 356)
       .addRect(120,130,200,200)
    .addImage(avatar, 120, 130, 200, 200)
        .toBuffer()
       const attachment = new MessageAttachment(del, "delete.png")
const embed = new MessageEmbed()
.setColor('#000034')
.attachFiles(attachment)
.setImage('attachment://delete.png');
       message.channel.send(embed) 
	}
};