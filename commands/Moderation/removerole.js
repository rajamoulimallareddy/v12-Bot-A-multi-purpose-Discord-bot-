const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will remove the role of mentioned user',

            category: 'Moderation',

            usage: '<prfix> + addrole + user + Role | Eg: >addrole <@!user> @role'

        });

    }

    async run(client, message, args) {
      message.delete();
    if(!message.member.hasPermission("MANGAE_ROLES")) {
    return message.channel.send(`:x: **${message.author.username}**, You do not have perms to remove role`)
      }
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.reply(":x: Please mention a user or user id")

    let role = message.guild.roles.cache.find(r => (r.name === args[1].toString()) || (r.id === args[1].toString().replace(/[^\w\s]/gi, '')));
    if(!role) return message.reply(":x: Please mention a role or role id")

    message.channel.send(`${user} **role has been removed successfully** (${role})`)
    user.roles.remove(role);

    try {

    } catch(error) {
        console.log(error)
    }
};}