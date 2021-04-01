const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bb', 'bass-boost'],
			description: 'boosts the bass of the current playing song',
			category: 'Music-Filters'
		});
	}

    
	async run(client, message, args) {
        const bot = this.client;
        if(!args)return message.channel.send("Please choose the quality of the bass to boost\n`a!bassboost easy/medium/hard`\nOr to turn off type `a!bassboost off`");
        const player = bot.music.players.get(message.guild.id);
    if(args[0] == 'low'){
    player.setEQ([
      { band: 0, gain: 0.05 },
      { band: 1, gain: 0.05 },
      { band: 2, gain: 0.05 },
      { band: 3, gain: 0.05 },
      { band: 4, gain: 0.05 },
      { band: 5, gain: 0.05 },
      { band: 6, gain: 0.05 },
      { band: 7, gain: 0.05 },
      { band: 8, gain: 0.05 },
      { band: 9, gain: 0.05 },
      { band: 10, gain: 0.05 },
      { band: 11, gain: 0.05 },
      { band: 12, gain: 0.05 },
      { band: 13, gain: 0.05 }
      ]);
    message.channel.send({embed: {color: "#000034", description: `Bassboost set to \`Low\``}})
    }
    else if(args[0] == 'medium'){
        player.setEQ([
          { band: 0, gain: 0.10 },
          { band: 1, gain: 0.10 },
          { band: 2, gain: 0.10 },
          { band: 3, gain: 0.10 },
          { band: 4, gain: 0.10 },
          { band: 5, gain: 0.10 },
          { band: 6, gain: 0.10 },
          { band: 7, gain: 0.10 },
          { band: 8, gain: 0.10 },
          { band: 9, gain: 0.10 },
          { band: 10, gain: 0.10 },
          { band: 11, gain: 0.10 },
          { band: 12, gain: 0.10 },
          { band: 13, gain: 0.10 }
          ]);
        message.channel.send({embed: {color: "#000034", description: `Bassboost set to \`Medium\``}})
        }
        else if(args[0] == 'high'){
            player.setEQ([
              { band: 0, gain: 0.15 },
              { band: 1, gain: 0.15 },
              { band: 2, gain: 0.15 },
              { band: 3, gain: 0.15 },
              { band: 4, gain: 0.15 },
              { band: 5, gain: 0.15 },
              { band: 6, gain: 0.15 },
              { band: 7, gain: 0.15 },
              { band: 8, gain: 0.15 },
              { band: 9, gain: 0.15 },
              { band: 10, gain: 0.15 },
              { band: 11, gain: 0.15 },
              { band: 12, gain: 0.15 },
              { band: 13, gain: 0.15 }
              ]);
            message.channel.send({embed: {color: "#000034", description: `Bassboost set to \`High\``}})
            }
       else if(args[0] == 'off'){    
        player.clearEQ();
                     message.channel.send({embed: {color: "#000034", description: `**Bassboost has beed turned OFF**`}})
        }
        else message.channel.send(":x: | Please select either low/medium/high")

    }}
