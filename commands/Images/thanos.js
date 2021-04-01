const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const AmeAPI = require('amethyste-api');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides thanos image',

            category: 'Images'

        });

    }

    async run(client, message, args) {
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author;
        let m = await message.channel.send("Loading...");
        let buffer = await this.client.AmeAPI.generate("thanos", {
          url: user.avatarURL({format: "png", dynamic: true}),
          avatar: message.author.avatarURL({format: "png", dynamic: true})
        });
        m.delete();
        message.channel.send({
          files: [
            {
              attachment: buffer,
              name: "thanos.png"
            }
          ]
        }); 
	}
};