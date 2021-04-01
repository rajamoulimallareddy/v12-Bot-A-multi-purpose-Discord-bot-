const { Emoji, MessageReaction, Client, MessageEmbed } = require('discord.js');
const GiveawaySchema = require('../models/giveaway');
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
};
module.exports = async(client, event) => {
		if (!Object.hasOwnProperty.call(events, event.t)) return;

		const { d: data } = event;
		const user = client.users.cache.get(data.user_id);
		const channel = client.channels.cache.get(data.channel_id);

		const message = await channel.messages.fetch(data.message_id);
		const member = message.guild.members.cache.get(user.id);

		const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
		let reaction = message.reactions.cache.get(emojiKey);

		if (!reaction) {
			reaction = "🎉"
        }
        
		if (member.id !== client.user.id) {
            if (event.t === 'MESSAGE_REACTION_ADD') {
                if ((reaction.emoji.name === '🎉') || (reaction.emoji.toString() === '🎉') || (reaction.emoji.id === '🎉')) {
                    const result = await GiveawaySchema.findOne({id: message.guild.id, enabled: true, channel: channel.id, msgId: message.id});

                    if(!result) return;
                    let SucessEmbed = new MessageEmbed()
                    .setTitle(`<:DynoCheck:776062884131635210> | Giveaway Entry Approved`)
                    .setDescription(`Your entry to [this giveaway](${message.url}) has been approved!`)
                    .addField('\u200B', '[Invite Link](https://top.gg/bot/756009470324113441) | [Vote](https://top.gg/bot/756009470324113441/vote) | [Support Server](https://discord.gg/vEsP8vz2DR)')
                    .setColor("#000034");
                    /*if(result.req[0] == undefined && result.req[1] == undefined) {
                        return message.channel.send(embed);
                    } */
                    if(result.role !== null) {
                    let role = message.guild.roles.cache.get(result.role);

                    if(!role) {
                        return message.guild.owner.send(`Hey. The giveaway [LINK](${message.url})'s role requirement role is missing. Please end the giveaway to not face any issue.`).catch(e => {});
                    }

                    let embed = new MessageEmbed()
                    .setTitle(`<:moosicerror:776063282368872479> | Giveaway Entry Denied`)
                    .addField('\u200B', '[Invite Link](https://top.gg/bot/756009470324113441) | [Vote](https://top.gg/bot/756009470324113441/vote) | [Support Server](https://discord.gg/vEsP8vz2DR)')
                    .setColor("#000034")
                    if(!member.roles.cache.has(role.id)) {

                            await reaction.users.remove(user.id);
                            embed.setDescription(`You must have the role ${role.name} in the server in order to enter the [giveaway](${message.url}).`);
                            return user.send(embed).catch(() => {});

                    }
                }
                
               if(result.server !== null) {
                   let embed = new MessageEmbed()
                   .setTitle(`<:moosicerror:776063282368872479> | Giveaway Entry Denied`)
                   .setColor("#000034")
                   .addField('\u200B', '[Invite Link](https://top.gg/bot/756009470324113441) | [Vote](https://top.gg/bot/756009470324113441/vote) | [Support Server](https://discord.gg/vEsP8vz2DR)')
                   let guild = client.guilds.cache.get(result.server);

                   if(!guild) {
                    return message.guild.owner.send({embed: {description: `Hey. The [giveaway's](${message.url}) server requirement server is missing. Either I am not in it. Please end the giveaway to not face any issue.`}}).catch(e => {});
                   }

                   if(!guild.members.cache.has(user.id)) {
                    await reaction.users.remove(user.id);
                    embed.setDescription(`You must be in ***${guild.name}*** in order to enter the [Giveaway](${message.url}).`);
                    return user.send(embed).catch(() => null);
                   }
               }

                    /*if(result.req[1] !== undefined) {
                        let data = result.req[1]
                        let guild = client.guilds.cache.get(data.id);
                        if(!guild) return message.guild.owner.send(`Hey. The giveaway [LINK](${message.url})'s server requirement doesn't exist. Either they removed me or the server maybe deleted. Please end the giveaway to not face any issue.`).catch(e => {});

                        if(!guild.members.cache.get(user.id)) {
                            await reaction.users.remove(user.id);
                            embed.setDescription(`You must be in [${guild.name}](${data.link}) in order to join the giveaway.`);
                            return user.send(embed).catch(() => null);

                        }

                    } */

                    return user.send(SucessEmbed).catch(() => null); 

            
        }

        } 
    }
}