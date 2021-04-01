const Discord = require('discord.js');

module.exports = async (client, message, filter, state) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const player = client.music.players.get(message.guild.id);

    if (!state) {
     player.clearEQ();
        const msg = await message.channel.send(`Turning off **${filter}**. This may take a few seconds...`);
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Turned off **${filter}**`)
            .setColor("#000034");
        await delay(5000);
        return msg.edit('', embed);
    }
    else if (state) {
        switch (filter) {
            case 'bass':
                player.setEQ(this.client.filters.bass.equalizer);
                break;
            case 'soft':
                player.setEQ(this.client.filters.soft.equalizer);
                break;
            case 'pop':
                player.setEQ(this.client.filters.pop.equalizer)
                break;
            case 'treblebass':
                player.setEQ(this.client.filters.treblebass.equalizer)
                break;
            case 'vaporwave':
                player.setEQ(this.client.filters.vaporwave.equalizer)
                break;
            default:
        }

        const msg = await message.channel.send(`Turning on **${filter}**. This may take a few seconds...`);
        const embed = new Discord.MessageEmbed()
            .setDescription(`Turned on **${filter}**`)
            .setColor("#000034");
        await delay(5000);
        return msg.edit('', embed);
    }
};
