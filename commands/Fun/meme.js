const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const got = require('got');
const request = require('request');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will provide you a meme!',

            category: 'Fun',

            usage: 'Eg: >meme'

        });

    }

    async run(client, message, args) {
            const tyson = new MessageEmbed()
            got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            tyson.setTitle(`${memeTitle}`)
            tyson.setURL(`${memeUrl}`)
            tyson.setImage(memeImage)
            tyson.setColor('#000034')
            tyson.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
              
              message.channel.send(tyson)
      }) 
};}