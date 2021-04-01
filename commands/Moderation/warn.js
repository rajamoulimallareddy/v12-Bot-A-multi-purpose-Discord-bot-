const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const pre = require('../../models/warns'); 
const mongoose = require("mongoose");
const discord = require("discord.js")
const config  = require("../../models/config")
const {v4: uuidv4} = require("uuid");

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will warn the mentioned user',

            category: 'Moderation',

            usage: 'Eg: >warn @user For Spamming'

        });

    }

    async run(client, message, args) {
   if(!message.member.hasPermission(["MANAGE_SERVER"]))return message.channel.send({embed: {color: "#000034", description: `:x: You don't have sufficient permissions to use this command`}})        
    const ee = new MessageEmbed()

.setTitle("**warn**")
.setDescription(`**Description:** Warn a member
**Usage:** warn [user] [reason]
**Example:** warn @Thunder#0031 Stop posting lewd images`)
    
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(ee)
    const reason = args.slice(1).join(" ");
    var today = new Date(); 
    var dd = String(today.getDate()).padStart(2, '0'); var mm = String(today.getMonth() + 1).padStart(2, '0'); var yyyy = today.getFullYear(); 
let gg;
if(mm == 1) gg = "Jan"
else if(mm == 2) gg = "Feb"
else if(mm == 3) gg = "March"
else if(mm == 4) gg = "April"
else if(mm == 5)gg = "May"
else if(mm == 6)gg = "June"
else if(mm == 7)gg = "July"
else if(mm == 8) gg = "Aug"
else if(mm == 9)gg = "Sept"
else if(mm == 10) gg = "Oct"
else if(mm == 11)gg = "Nov"
else if(mm == 12)gg = "Dec"
today = gg + " " + dd + " " + yyyy;
    pre.findOne({name: "warns", userid: user.user.id, serverid: message.guild.id}).then(res => {
      
    if(!res || res == [])  {
        let c = []
        c.push({
          id: uuidv4().replace("-", "").replace("-", "").replace("-", "").replace("-", ""),
          reason: reason,
          moderator: message.author.tag,
          date: today
        })
      
 
 let d = new pre({
 _id: new mongoose.Types.ObjectId(),
         name: "warns",
          serverid: message.guild.id,
          userid: user.user.id,
          warnings: c   })
     
        d.save();
        message.channel.send({embed: {description: `** ${user.user.tag} has been successfully warned!** ** ${reason}**`,color: "#000034"}})
      user.user.send(`You were warned in ${message.guild.name} for: ${reason}`)
      
      }
     else {
       if(!res.warnings == []) {
         
        
 if(res.warnings) {var c = res.warnings ? res.warnings : []} else{var c = []}
        
   
 c.push({
      id: uuidv4().replace("-", "").replace("-", "").replace("-", "").replace("-", ""),
      reason: reason,
      moderator: message.author.tag,
      date: today
    })
        const f = new pre({
          _id: new mongoose.Types.ObjectId(),
          name: "warns",
          serverid: message.guild.id,
          userid: user.user.id,
          warnings: c
        })
        
        pre.deleteOne({name: "warns", userid: user.user.id, serverid: message.guild.id}).catch(console.error())
      f.save().catch(console.error())
        message.channel.send({embed: {color: "#000034", description: `** ${user.user.tag} has been successfully warned! **  **${reason}**`}})
         user.user.send(`You were warned in ${message.guild.name} for: ${reason}`)
      }
    }})
};}