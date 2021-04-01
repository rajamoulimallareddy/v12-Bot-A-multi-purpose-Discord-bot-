const Event = require('../Structures/Event');
const config = require('../config.json');
const ThunderClient = require('../Structures/ThunderClient');

module.exports = class extends Event {

	constructor(...args) {		super(...args, {

			once: true

		});

	}

	
  async run() {
const client = this.client;
    client.manager.init(client.user.id);
		console.log([

			`Logged in as ${this.client.user.tag}`,

			`Loaded ${this.client.commands.size} commands!`,

			`Loaded ${this.client.events.size} events!`

		].join('\n'));
		const types = [
			`LISTENING`,
			`WATCHING`,
			`WATCHING`
			]
		setInterval(() => {
			let i = 0;

			const activities = [
				`${this.client.prefix}help | ${this.client.prefix}invite  | ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users in ${this.client.guilds.cache.size} servers!`,
				`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users in ${this.client.guilds.cache.size} servers!`,
				`DEVELOPED BY PIYUSH(TYSON)`
			]
			
			this.client.user.setActivity(`${activities[i++ % activities.length]}`
			, {type: `${types[i++ % types.length]}`} )}, 10000);
		}
	

};