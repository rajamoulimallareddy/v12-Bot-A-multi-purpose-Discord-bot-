const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const AmeAPI = require('amethyste-api');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This provides 3000 image',

            category: 'Images'

        });

    }

    async run(client, message, args) {
        let user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author;
        let m = await message.channel.send("Loading...");
        let buffer = await this.client.AmeAPI.generate("3000years", {
          url: user.avatarURL({format: "png", dynamic: true})
        });
        m.delete();
        message.channel.send({
          files: [
            {
              attachment: buffer,
              name: "3000years.png"
            }
          ]
        });
	}
};