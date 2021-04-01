const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['vcmove'],

            description: 'This will move all users from 1 vc to another!',

            category: 'Moderation',

            usage: 'Eg: >voicemove'

        });

    }

    async run(client, message, args) {
        if (!message.member.permissions.any(["ADMINISTRATOR", "MOVE_MEMBERS"])) {
        return message.reply(":x: You don't have `Move_Members or Administrator` power to use this command.");
      }
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send("You Have To Be In A Voice Channel To Use This Command");
    if (!message.guild.me.voice.connection) {
        channel.join().then((connection) => {
            message.guild.me.voice.setSelfDeaf(true);
            const e = new MessageEmbed()
            .setDescription('**| 🎛 Now, move me and I\'ll drag users to a new voice channel.**')
            .setColor('#000034')
            message.channel.send(e)

            client.on("voiceStateUpdate", async (oldmem, newmem) => {
                if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                    let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                    if (client.user.id === newmem.member.user.id) {
                        channel.members.forEach(e => {
                            e.voice.setChannel(newchannel);
                            newchannel.leave();
                        })
                    }
                }
            })
        })
    }
    else {
        message.channel.send(`**I'am already Connected To A Voice Channel.**`);
    }
};}