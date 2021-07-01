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

client.start();
