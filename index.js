const ThunderClient = require('./Structures/ThunderClient');
const { ErelaClient } = require('erela.js');
const { Manager, Player } = require("erela.js");
const config = require('./config.json');
const client = new ThunderClient(config);
client.music = client.manager;
const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const mongoose = require('mongoose');
const discord = require('discord.js');
const GiveawaySchema = require("./models/giveaway");
const xd = new Map();

this.client = client;
client.xd = xd;
mongoose.connect("//link here" ,
{useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true}) ;
    mongoose.connection.on("connected" , () => { 
        console.log("MongoDB connected")
    });

client.manager = new Manager({
  nodes: config.nodes,
    autoPlay: true,
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    const { thumbnail } = track;
   let ccc;
if(isNaN(track.requester) == false) ccc = `[${track.requester}]`
else ccc = "";
const o = track.title.slice(63, track.title.length)
let t;
if(track.title > 63)t = `${track.title.slice(0, 63).replace("(Official Video)", "")}${track.title.slice(63, track.title.length).replace(o, "...")}`
  else t = track.title.replace("(Official Video)", "")
      const embed = new discord.MessageEmbed()
    .setAuthor('| Now playing', track.requester.displayAvatarURL({dynamic: true}))
    .setDescription(`<a:music:786161722955399168> | [${t}](${track.uri}) ${ccc}`)
    .setColor("#000034")
  this.client.channels.cache.get(player.textChannel).send(embed);
    const cc = this.client.guilds.cache.get(player.guild).members.cache.get(client.user.id)
    if(cc.voice.serverMute === false) {
      cc.voice.setDeaf(true)
    }
  })
.on("queueEnd", async player => {
player.destroy()
client.channels.cache.get(player.textChannel).send({embed: {color: "#000034", description: "<a:reddot:776065304602214421> **Queue has finished playing, stopping music and leaving voice channel!**"}})    
  })

client.music = client.manager;
  const {Utils} = require ("./utils/music/formatTime");
  client.formatTime = Utils.formatTime;
client.on("raw", (d) => client.manager.updateVoiceState(d));

client.start();
