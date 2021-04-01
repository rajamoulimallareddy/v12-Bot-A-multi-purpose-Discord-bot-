const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['h'],
            description: 'Displays all the commands in the bot',
            category: 'Utils',
            usage: '[command]'
        });
    }

    async run(client, message, [command]) {
    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    };
    const owners = ["663759563555733543" , "580381333914648579"]
        const embed = new MessageEmbed()
            .setColor('#000034')
            .setAuthor(`${client.user.username} Commands`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .addField('\u200B', '[Invite Link](https://top.gg/bot/756009470324113441) | [Vote](https://top.gg/bot/756009470324113441/vote) | [Support Server](https://discord.gg/vEsP8vz2DR)')
            .setTimestamp();

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return message.channel.send(`Invalid Command named. \`${command}\``);

            embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
            embed.setDescription([
                `**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
                `**❯ Description:** ${cmd.description}`,
                `**❯ Category:** ${cmd.category}`,
                `**❯ Usage:** ${cmd.usage}`
            ]);
     
            return message.channel.send(embed);
        } else {
            embed.setDescription([
                `**These are the available commands for ${client.user.username}**`
            ])
            let categories;
			if (!owners.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                embed.addField(` **${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
                    cmd.category === category).map(cmd => `\`${cmd.name.capitalize()}\``).join(', '));

            }
            return message.channel.send(embed);
        }
    }

};