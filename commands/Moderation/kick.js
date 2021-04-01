const Command = require('../../Structures/Command');
const Discord = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'This will kick the mentioned user',
            category: 'Moderation'
        });
    }

    async run(client, message, args) {
    if (!message.member.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS"]))
      return message.channel.send({
        embed: {
          color: "#000034",
          description:
            " You don't have permission to use this command"
        }
      });
    const misf = new Discord.MessageEmbed().setTitle("Command >kick")
      .setDescription(`**Description:** Kick a member
**Usage: **
	>kick [user] (reason)
**Example:**
	>kick @ᴵ ᵃᵐ туѕσи ᴷᶜ#7773 Spammer!`);

    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]); //ho gaya fix
    if (!user) return message.channel.send(misf);
  let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given";
    if (
      user.hasPermission([
        "ADMINISTRATOR",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_SERVER"
      ])
    )
      return message.channel.send({
        embed: {
          color: "#000034",
          description:
            "That user is a mod/admin, I can't do that."
        }
      });
    const mem = client.users.cache.get(user.id);
    try {
      user.kick().then(() => {
        user.send({
          embed: {
            description: `**You have been kicked from ${message.guild.name} for:** **${reason}**`
          }
        });
        message.channel.send({
          embed: {
            color: "#000034",
            description: `** ${mem.tag} has been successfully kicked!**`
          }
});
      })}catch (e) {
      message.channel.send(e.message);
    }
  }
};