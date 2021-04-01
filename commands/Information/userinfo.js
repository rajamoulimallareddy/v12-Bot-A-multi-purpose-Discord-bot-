const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const flags = {
	DISCORD_EMPLOYEE: '<:Employee:815411829249277992>',
	DISCORD_PARTNER: '<a:end_partner:815407666192187433> ',
	BUGHUNTER_LEVEL_1: '<:BugHunter:815408827729051698>',
	BUGHUNTER_LEVEL_2: '<:Bughunter_Level2:815411858306629642>',
	HYPESQUAD_EVENTS: '<:hypesquadevent:815409587813351436>',
	HOUSE_BRAVERY: '<:Bravery:815412928764837948>',
	HOUSE_BRILLIANCE: '<:Brilliance:815411786504732773> ',
	HOUSE_BALANCE: '<:Balance:815411805626302515>',
	EARLY_SUPPORTER: '<:EarlySupporter:815407670571696170>',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: '<:Screenshot_20210228_112246:815461655425187851> ',
	VERIFIED_DEVELOPER: '<:botdev:815407660827934741> '
};

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['whois','ui'],
 
            description: 'This provides the information of mentioned user/bot',

            category: 'Information'

        });

    }

    async run(client, message, args) {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
	if(!member) return message.channel.send(`**User is not in the Server.**`);
	const roles = member.roles.cache
		.sort((a, b) => b.position - a.position)
		.map(role => role.toString())
		.slice(0, -1);
	const userFlags = member.user.flags.toArray();
	const embed = new MessageEmbed()
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
		.setColor('#010030')
		.addField('User', [
			`**:white_small_square: Username:** ${member.user.username}`,
			`**:white_small_square: Discriminator:** ${member.user.discriminator}`,
			`**:white_small_square: ID:** ${member.id}`,
			`**:white_small_square: Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
			`**:white_small_square: Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
			`**:white_small_square: Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
			`**:white_small_square: Game:** ${member.user.presence.game || 'Not playing a game.'}`,
			`\u200b`
		])
		.addField('Member', [
			`**:white_small_square: Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
			`**:white_small_square: Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
			`**:white_small_square: Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
			`**:white_small_square: Roles [${roles.length}]:** ${roles.length < 10000 ? roles.join(', ') : roles.length > 10000 ? this.client.utils.trimArray(roles) : 'None'}`,
			`\u200b`
		]);
	return message.channel.send(embed);
}}