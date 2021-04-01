const Command = require('../../Structures/Command');
const xd = new Map();
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['nc'],
			description: 'enable/disable nightcore filter',
			category: 'Music-Filters'
		});
	}

    
	async run(client, message, args) {
    const delay = ms => new Promise(res => setTimeout(res, ms));

const bot = this.client;
const player = bot.music.players.get(message.guild.id);
if(!player) return;
 function nightcore(boolean, player) {
        if(typeof boolean !== "boolean") throw new TypeError('(NIGHTCORE) Parameter must be true or false.');
if(!player)return;
        if(boolean) {

        let speed = 1.3;
        let pitch = 1.3;
        let rate = 1.3;

        player.node.send({
            op: 'filters',
            guildId: player.guild.id || player.guild,
timescale: { pitch: 1.2 },
tremolo: { depth: 0.3, frequency: 14 }           
        });

player.setEQ([
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ])        

        player.nightcoreOn = true;

    }else{
        
            player.node.send({
                op: 'filters',
                guildId: player.guild.id || player.guild,
                timescale: { pitch: 1.0 },
tremolo: { depth: 0, frequency: 14 }       
            });

           player.clearEQ()
        
        player.nightcoreOn = false;
    }

        return player.nightcoreOn ? true : false;
    }

if(args[0] === "enable" || args[0] === "on"){
    nightcore(true, player)
xd.set(message.guild.id, true)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034", description: "**Enabled** nightcore effect."}})
}
else if(args[0] === "disable" || args[0] === "off"){
    nightcore(false, player)
xd.set(message.guild.id, false)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034",description: "**Disabled** nightcore effect."}})
}
else{
const xdd = xd.get(message.guild.id)
if(!xdd) {
    nightcore(true, player)
xd.set(message.guild.id, true)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034", description: "**Enabled** nightcore effect."}})
}
else if(xdd === true){
    nightcore(false, player)
xd.set(message.guild.id, false)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034",description: "**Disabled** nightcore effect."}})

}

}

    }}