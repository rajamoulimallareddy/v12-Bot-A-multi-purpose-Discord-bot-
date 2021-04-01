const Command = require('../../Structures/Command');
const xd = new Map();
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'enable/disable vaporwave filter',
			category: 'Music-Filters'
		});
	}

    
	async run(client, message, args) {
    const delay = ms => new Promise(res => setTimeout(res, ms));

const bot = this.client;
const player = bot.music.players.get(message.guild.id);
if(!player) return;
 function vaporwave(boolean, player) {
        if(typeof boolean !== "boolean") throw new TypeError('(VAPORWAVE) Parameter must be true or false.');
if(!player)return;
        if(boolean) {


        player.node.send({
            op: 'filters',
            guildId: player.guild.id || player.guild,
            timescale: { pitch: 0.5 },
           	tremolo: { depth: 0.3, frequency: 14 },          
        });

player.setEQ([
            { band: 1, gain: 0.3 },
            { band: 0, gain: 0.3 },
        ])        

        player.vaporwaveOn = true;
    }else{
        
            player.node.send({
                op: 'filters',
                guildId: player.guild.id || player.guild,
                timescale: { pitch: 1.0 },
                tremolo: { depth: 0, frequency: 14 }       
            });

           player.clearEQ()
        
        player.vaporwaveOn = false;
    }

        return player.vaporwaveOn ? true : false;
        
    }

if(args[0] === "enable" || args[0] === "on"){
    vaporwave(true, player)
xd.set(message.guild.id, true)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034", description: "**Enabled** vaporwave effect."}})
}
else if(args[0] === "disable" || args[0] === "off"){
    vaporwave(false, player)
xd.set(message.guild.id, false)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034",description: "**Disabled** vaporwave effect."}})
}
else{
const xdd = xd.get(message.guild.id)
if(!xdd) {
    vaporwave(true, player)
xd.set(message.guild.id, true)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034", description: " **Enabled** vaporwave effect."}})
}
else if(xdd === true){
    vaporwave(false, player)
xd.set(message.guild.id, false)
        await delay(2000);
  return  message.channel.send({embed: {color: "#000034",description: " **Disabled** vaporwave effect."}})

}

}
    }}