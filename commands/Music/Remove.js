const Command = require("../../Structures/Command");


module.exports = class extends Command {
  constructor (...args) {
    super (...args, {
      name: "remove",
      category: "Music",
		inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true

    })
  }
  async run (client, message, args) {
    const player = this.client.music.players.get(message.guild.id)
    if(!player) return message.channel.send("There is no queue in the guild.")


		if (isNaN(args[0])) return message.channel.send('Invalid number.');

		if (!args[1]) {
			if (args[0] == 0) return message.channel.send(`Cannot remove a song that is already playing. To skip the song type: \`${client.settings.prefix}skip\``);
			if (args[0] > player.queue.length) return message.channel.send('Song not found.');

			const { title } = player.queue[args[0] - 1];

			player.queue.splice(args[0] - 1, 1);
			return message.channel.send({embed : {
				color: '#000034',
				description: `Removed **${title}** from the queue`
			  }});
		}
		else {
			if (args[0] == 0 || args[1] == 0) return message.channel.send(`Cannot remove a song that is already playing. To skip the song type: \`${client.settings.prefix}skip\``);
			if (args[0] > player.queue.length || args[1] > player.queue.length) return message.channel.send('Song not found.');
			if (args[0] > args[1]) return message.channel.send('Start amount must be bigger than end.');

			const songsToRemove = args[1] - args[0];
			player.queue.splice(args[0] - 1, songsToRemove + 1);
			return message.channel.send({embed : {
				color: '#000034',
				description: `Removed **${title}** from the queue`
			  }});
		}      
  }
}
