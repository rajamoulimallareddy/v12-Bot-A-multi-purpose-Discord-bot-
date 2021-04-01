const Event = require('../Structures/Event');
const config = require('../config.json');

 module.exports = class extends Event {

	constructor(...args) {

		super(...args, {

			once: true

		});

	}
  async run(oldMessage) {
    this.client.snipes = new Map()
    let content = oldMessage.content;
    this.client.snipes.set(oldMessage.guild.id, {content: oldMessage.content, author: oldMessage.author.username, avatar: oldMessage.author.displayAvatarURL({dynamic: true})} );
    setTimeout(() => {
        let c = this.client.snipes.delete(oldMessage.guild.id ); 
    }, 120000)
}};