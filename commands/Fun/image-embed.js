const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: ['imgembed'],

            description: 'This will embed your image',

            category: 'Fun',

            usage: 'Eg: >image-embed <attachement/image-link>'

        });

    }

    async run(client, message, args) {
        let attachments = message.attachments.array();

        if (attachments.length === 0) return message.reply("Please upload some images!");
        else if (attachments.length > 1) return message.reply("I only can process one image at one time!");
    
        var level = 50;
    
        try {
    
            message.channel.startTyping(true);  
    message.channel.send({embed: {
    description: args.join(' ') ? args.join(' ') : '',
    image: {url: message.attachments.first().proxyURL},
    color: '#010030',
    timestamp: Date.now()
    }})
    message.channel.stopTyping(true)
        } catch (error) {
            await message.channel.stopTyping(true);
            return message.channel.send(`An error occured: \`${error.message}\`.`); 
    
        }
};}