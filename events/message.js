const Event = require("../Structures/Event");
const moment = require("moment");
const pre = require("../models/prefix");

module.exports = class extends Event {
  async run(message) {
    const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);

    const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);
        const data = {};

    if (message.author.bot) return;
    		if(message.guild){

			// Gets guild data

			const guild = await this.client.findOrCreateGuild({ id: message.guild.id });

			message.guild.data = data.guild = guild;

		}
    if (message.guild) {
      // Gets the data of the member
      const memberData = await this.client.findOrCreateMember({
        id: message.author.id,
        guildID: message.guild.id
      });
      data.memberData = memberData;
    }
    const afkReason = data.memberData.afk;
    if (afkReason) {
      data.memberData.afk = null;
      await data.memberData.save();
      data.memberData.afktime = null;
      await data.memberData.save();
      message.channel.send(
        `Welcome back ${message.author}, I removed your afk!`
      );
    }

    message.mentions.users.forEach(async u => {
      const userData = await this.client.findOrCreateMember({
        id: u.id,
        guildID: message.guild.id
      });
      if (userData.afk) {
        message.channel.send(
          `${u.tag} is AFK: ${userData.afk} - ${moment(
            userData.afktime
          ).fromNow()}`
        );
      }
    });
    const res =  await pre.findOne({guildid: message.guild.id})
    let p;
    if(!res) p = this.client.prefix
    else p = res.prefix;

    if (message.content.match(mentionRegex))
      message.channel.send(
        `My prefix for ${message.guild.name} is \`${p}\`.`
      );
    const prefix = message.content.match(mentionRegexPrefix)
      ? message.content.match(mentionRegexPrefix)[0]
      : p;

    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

    if (command) {
      if (
        command.ownerOnly &&
        !this.client.utils.checkOwner(message.author.id)
      ) {
        return message.reply(
          "Sorry, this command can only be used by the bot owners."
        );
      }

      if (command.guildOnly && !message.guild) {
        return message.reply(
          "Sorry, this command can only be used in a discord server."
        );
      }

      if (command.nsfw && !message.channel.nsfw) {
        return message.reply(
          "Sorry, this command can only be ran in a NSFW marked channel."
        );
      }

      if (command.args && !args.length) {
        return message.reply(
          `Sorry, this command requires arguments to function. Usage: ${
            command.usage
              ? `${this.client.prefix + command.name} ${command.usage}`
              : "This command doesn't have a usage format"
          }`
        );
      }

      if (message.guild) {
        const userPermCheck = command.userPerms
          ? this.client.defaultPerms.add(command.userPerms)
          : this.client.defaultPerms;

        if (userPermCheck) {
          const missing = message.channel
            .permissionsFor(message.member)
            .missing(userPermCheck);

          if (missing.length) {
            return message.reply(
              `You are missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, you need them to use this command!`
            );
          }
        }

        const botPermCheck = command.botPerms
          ? this.client.defaultPerms.add(command.botPerms)
          : this.client.defaultPerms;

        if (botPermCheck) {
          const missing = message.channel
            .permissionsFor(this.client.user)
            .missing(botPermCheck);

          if (missing.length) {
            return message.reply(
              `I am missing ${this.client.utils.formatArray(
                missing.map(this.client.utils.formatPerms)
              )} permissions, I need them to run this command!`
            );
          }
        }
      }
this.client.data = data;
      command.run(this.client, message, args);
    }
  }
};