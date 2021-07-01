const ThunderClient = require('./Structures/ThunderClient');
const config = require('./config.json');
const client = new ThunderClient(config);
const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const mongoose = require('mongoose');
const discord = require('discord.js');
this.client = client;

mongoose.connect("//link here" ,
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

client.start();
