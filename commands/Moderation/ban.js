const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['hackban'],

            description: 'This will ban a mentioned user',

            category: 'Moderation',

            usage: '<prefix> + ban + user + reason | `Eg: >ban @user for spamming`'

        });

    }

    async run(client, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {

            return message.channel.send("Something went wrong: No permission. (BAN_MEMBERS)");
        
        }
        if (!message.guild.me.hasPermission(["BAN_MEMBERS"])){
            return message.channel.send("I Am Not Having Enough Perms");;
        }
        
        let userID;
        
        let reason = args.slice(1).join(" ");
             
        if (!reason) reason = "No reason provided";
                
        if (message.mentions.members.first()){
        
            try{
                message.mentions.members.first().ban();
              const tyson2 = new MessageEmbed()
              .setDescription(`✅ **${message.mentions.members.first().user.username}** has been banned, from  this server! \nReason: ${reason}.`)
              .setColor('#000034');
                return message.channel.send(tyson2);
            }catch(e){
                console.log(e)
                return message.channel.send("There was an error occurred");;
            }
        
        } else {
            userID = args[0];
            client.users.fetch(userID).then(async user => {
    
                await message.guild.members.ban(user.id, {reason: reason});
              
                const tyson = new MessageEmbed()
               .setDescription(`✅ **${user.tag}** has been banned, from  this server! \nReason: ${reason}.`)
               .setColor('#000034');
                return message.channel.send(tyson);
            })
         
            }
    
        }
};