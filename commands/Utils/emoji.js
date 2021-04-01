const Command = require('../../Structures/Command');
const discord = require('discord.js');
const snek = require('snekfetch');
const twemoji = require('twemoji');
module.exports = class extends Command {

	constructor(...args) {		super(...args, {

			aliases: ['emote','enalarge','jumbo','large'],

            description: 'enlarges the emoji',

			      category: 'Utils',

            usage: 'Eg: >emoji <emoji>'

		});

	}

	async run(client, message, args) {
    try {
      const emote = discord.Util.parseEmoji(args[0]);
    if (emote.animated === true) {
      let gg = "";
let hhhh;
let hh = this.client.emojis.cache.find(x => x.id === emote.id)
if(!hh) hhhh = "\n"
else {
hhhh = `\n**Preview:** ${hh}\n`
gg = `\n**Created:** \`${hh.createdAt.toDateString()}\``
}
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
      const { body: buffer } = await snek.get(`${URL}`);
      message.channel.send({
        embed: {
          color: "#000034",
          description: `**Name:** \`${emote.name}\`${hhhh}**ID:** \`${emote.id}\`\n**Identifier: **\`a:${emote.name}:${emote.id}\`${gg}`,
          image: {url: URL}
        }
      });
    } else if (emote.id === null) {
      const twemote = twemoji.parse(args[0]);
      const regex = /src="(.+)"/g;
      const regTwemote = regex.exec(twemote)[1];
      const { body: buffer } = await snek.get(`${regTwemote}`);
      await message.channel.send({
        embed: {
          color: "#000034",
             image: {url: regTwemote}
        }
      });
    } else {
      let gg = "";
      let hhhh;
      let hh = this.client.emojis.cache.find(x => x.id === emote.id)
      if(!hh) hhhh = "\n"
      else {
      hhhh = `\n**Preview:** ${hh}\n`
      gg = `\n**Created:** \`${hh.createdAt.toDateString()}\``
      }
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
      const { body: buffer } = await snek.get(`${URL}`);
      message.channel.send({
        embed: {
          color: "#000034",
          description: `**Name:** \`${emote.name}\`${hhhh}**ID:** \`${emote.id}\`\n**Identifier: **\`a:${emote.name}:${emote.id}\`${gg}`,
          image: {url: URL}
        }
      });
    }
  } catch (error) {
    if (error.message === 'TypeError: Cannot read property \'1\' of null') {
      message.reply('Give me an actual emote.');
    }
  }
};
}