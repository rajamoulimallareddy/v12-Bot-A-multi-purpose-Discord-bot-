const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['ri'],

            description: 'This will provides the information of ',

            category: 'Information',

            usage: 'Eg: >roleinfo @role'

        });

    }

    async run(client, message, args) {
  let inline = true
    let role = args.join(` `)
    if(!role) return message.reply(":x: Specify a role!");
    let gRole = message.guild.roles.cache.find(r => (r.name === args[0].toString()) || (r.id === args[0].toString().replace(/[^\w\s]/gi, '')));
    if(!gRole) return message.reply(":x: Couldn't find that role.");

    const status = {
        false: "No",
        true: "Yes"
      }

      let roleemebed = new MessageEmbed()
      .setTitle(`Information for ${gRole.name}`)
      .setColor("#010030")
      .setDescription(`
      :white_small_square: **ID:  \`${gRole.id}\`
      :white_small_square: Hex:  \`${gRole.hexColor}\`
      :white_small_square: Position:  \`${gRole.position}\`
      :white_small_square: Hoisted:  \`${status[gRole.hoist]}\`
      :white_small_square: Mentionable:  \`${status[gRole.mentionable]}\`
      :white_small_square: Managed:  \`${status[gRole.managed]}\`
      :white_small_square: Permissions: \`${gRole.permissions.toArray().map(x => x).join(", ")}\`
      :white_small_square: Members:  \`${gRole.members.size}\` 
      ${message.guild.members.cache.filter(member => member.roles.cache.find(r => r == role)).sort().map(member => `<@` + member.user.id + `>`)}**
      `)
    
    message.channel.send(roleemebed);
}};