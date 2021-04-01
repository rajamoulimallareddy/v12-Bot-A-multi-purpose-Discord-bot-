const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {        super(...args, {

            aliases: [],

            description: 'This will create a poll for you',

            category: 'Fun',

            usage: 'Eg: >poll Who is Best Developer, <raj> <volt> <tyson>...'

        });

    }

    async run(client, message, args) {
    let emojis = [
        '',
        '1️⃣',
        '2️⃣',
        '3️⃣',
        '4️⃣',
        '5️⃣',
        '6️⃣',
        '7️⃣',
        '8️⃣',
        '9️⃣'
    ]

        let str ='';
        let all = args.join(" ").split(",");
        let question = all[0]; 
        let arg = all[1];  
        let i = 0;
        if(!all  || !question || !arg) return message.channel.send('Usage: <prefix> cmd <question>, options || Example = >poll What is ur fav food , pizza , burger etc')
        for (const el of arg.split(" ")) {
           if (el.length === 0){ 
               continue;
           }
           
            str += i + 1 +". " + el +"\n";
        i++;
        }
        const embed = new MessageEmbed()
          .setTitle(`**${question}**`)
          .setColor('#000034')
          .setDescription(str)
          .setTimestamp()
          const msg = await message.channel.send(embed);
      
          for(let i = 1; i < arg.split(" ").length; i++) {
            msg.react(emojis[i])
          }
};}