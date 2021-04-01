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
mongoose.connect("mongodb+srv://Piyush:KG5EQGjL3GoK0K5j@thundercluster.ui9we.mongodb.net/melody?retryWrites=true&w=majority" ,
{useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true}) ;
    mongoose.connection.on("connected" , () => { 
        console.log("MongoDB connected")
    });

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#000034",
        reaction: "🎉"
    }
});

client.start();
const AmeClient = require("amethyste-api")

client.AmeAPI = new AmeClient("95a264b6b501c2904553fd6d5b2ce0b34b1c4f76d7b4dcce98b558efb214d678b7f552dd849e138be05d1b9927832750f8913be4d5ef9118f59f84464e8b0bd9")
fs.readdir("./listeners/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./listeners/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});


const {utc} = require("moment")
function shuffle(arr) {
        for (let i = arr.length; i; i--) {
            const j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
        return arr;
    };
client.draw = function draw(list) {
        const shuffled = shuffle(list);
        return shuffled[Math.floor(Math.random() * shuffled.length)];
    };

    async function fetchReactedUsers(reaction, after) {
      const opts = { limit: 100, after };
      const reactions = await reaction.users.fetch(opts);
      if (!reactions.size) return [];
    
      const last = reactions.last().id;
      const next = await fetchReactedUsers(reaction, last);
      return reactions.array().concat(next);
    }
    
setInterval(async() => {
  const Giveaways = await GiveawaySchema.find({enabled: true});
  if(!Giveaways) return;
  Giveaways.forEach(async(giveaway) => {
    const embed = new MessageEmbed(giveaway.embed);
    let channel = await client.channels.cache.get(giveaway.channel);
    if(!channel) {
      await GiveawaySchema.deleteOne({id: giveaway.id, enabled: true, channel: giveaway.channel, msgId: giveaway.msgId})
      return;
  }
  let msg = await channel.messages.fetch(giveaway.msgId);
  if(!msg)  {
    await GiveawaySchema.deleteOne({id: giveaway.id, enabled: true, channel: giveaway.channel, msgId: giveaway.msgId})
    return;
}

if(Date.now() > giveaway.time) {
 // await m.reactions.cache.get("🎉")

 const reaction = msg.reactions.cache.get("🎉");


 let users = await fetchReactedUsers(reaction);


 const list = await users.filter(u =>  u.bot !== true);

 if (!list.length) {
  embed.description = `<:moosicerror:776063282368872479> | Not enough valid entries were made to pick a winner`;
  embed.footer.text = `Giveaway Errored At`;
embed.color = "#000034";
  giveaway.enabled = false;
await giveaway.save().catch(console.error);
  //await GiveawaySchema.deleteOne({id: giveaway.id, enabled: true, channel: giveaway.channel, msgId: giveaway.msgId})
return msg.edit(`<:moosicerror:776063282368872479> **GIVEAWAY ERRORED** <:moosicerror:776063282368872479> `, embed);

}
let winners = [];
for (let i = 0; i < giveaway.winnerCount; i++) {
const x = client.draw(list);

if (!winners.includes(x)) winners.push(x);
}

embed.description = `:gift: **${giveaway.prize}**\n:trophy: Winner(s): ${winners.filter(u => u !== undefined && u !== null).map(u => u.toString()).join(", ")}`;
embed.footer.text = `Thunder | Giveaway Finished`;


const mmm = await msg.edit(`<a:yeah:786145892797120532><a:yeah:786145892797120532> **GIVEAWAY ENDED** <a:yeah:786145892797120532><a:yeah:786145892797120532>`, embed);
giveaway.enabled = false

await giveaway.save().catch(e => console.log(e))
if (winners.length) {msg.channel.send(`:confetti_ball: Congratulations :confetti_ball: ${winners.map(u => u.toString()).join(", ")}, you won **${giveaway.prize}**!`, {
embed: {
color: "#000034",  
description: `[Giveaway Link](${mmm.url})`
}
});
winners.forEach(x => x.send({
embed: {
author: {name: `YOU WON A GIVEAWAY`, icon_url: "https://cdn.discordapp.com/attachments/776006333572841513/777906860715671552/X11M.gif"},
color: "#000034",
description: `:gift: **${giveaway.prize}**\n:trophy: [Giveaway Link](${mmm.url})`,
footer: {name: client.user.username, icon_url: client.user.avatarURL()}
}
}))
//.catch(() => {});

}

}
  })
}, 60000);

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
