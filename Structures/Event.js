module.exports = class Event {

	constructor(client, file, name, options = {}) {

		this.client = client;

		this.type = options.once ? 'once' : 'on';

		this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;

		this.name = options.name || file.name;

		this.file = file;

	}

	// eslint-disable-next-line no-unused-vars

	async run(...args) {

		try {
			await this.run(...args);
		}
		catch (err) {
			console.error(err);
		}

		throw new Error(`The run method has not been implemented in ${this.name}`);

	}

	reload() {
		const path = `../listeners/${this.name}.js`;
		delete require.cache[path];
		require(`../listeners/${this.name}.js`);
	}

};