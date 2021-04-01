const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will mute a mentioned user!',

            category: 'Moderation',
      
            usage: '<prefix> + mute + user + reason(optional)`Example : >mute <@!user>/<userID> For Spamming`'

        });

    }

    async run(client, message, args) {
      const Discord = require('discord.js');
	    if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("You haven't the permission to use this command!");
	    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("I don't have permission to manage roles!");
	    let toMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	    if(!toMute) return message.reply("Supply a user to be muted!");
	    let reason = args.slice(1).join(" ");
	    if(!reason) reason = "No reason given";
	    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
	    if(!muteRole) {
		    try {
			    muteRole = await message.guild.roles.create({
				    data: {
				  	name: "Muted",
					  color: "#ffffff",
					  permissions: []
				  }
			  });
		      } catch (e) {
			    console.log(e.stack);
		}
	}
	message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(muteRole, {
			"SEND_MESSAGES": false,
			"ATTACH_FILES": false,
			"SEND_TTS_MESSAGES": false,
			"ADD_REACTIONS": false,
			"SPEAK": false,
			"STREAM": false
		});
	});
	const muteConfirm = new Discord.MessageEmbed()
	.setColor('#000034')
	.setDescription(`✅ ${toMute.user.username} has been successfully muted!\nReason: ${reason}`);
	toMute.roles.add(muteRole.id).then(() => {
		message.delete()
		toMute.send(`You have been muted in **${message.guild.name}** for: **${reason}**`)
		message.channel.send(muteConfirm)
	});
};}