const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { version } = require('../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['bi'],

            description: 'This provides information of the bot',

            category: 'Information'

        });

    }

    async run(client, message, args) {
		const core = os.cpus()[0];
		var user = message.mentions.users.first();
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor('#000034')
			.addField('General', [
				`**:white_small_square: Client:** ${this.client.user.tag} (${client.user.id})`,
				`**:white_small_square: Commands:** ${this.client.commands.size}`,
				`**:white_small_square: Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
				`**:white_small_square: Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**:white_small_square: Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
				`**:white_small_square: Developer:** The bot is made with heart by **ᴵ ᵃᵐ туѕσи** `,
				`**:white_small_square: Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
			  `**:white_small_square: Node.js:** ${process.version}`,
				`**:white_small_square: Version:** v${version}`,
				`**:white_small_square: Support Server:** https://discord.gg/vEsP8vz2DR`,
				'\u200b'
			])
			.setTimestamp();

		message.channel.send(embed);
	}
};
