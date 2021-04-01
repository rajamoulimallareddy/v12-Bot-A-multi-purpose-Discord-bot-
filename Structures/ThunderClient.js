const { Client, Collection, Permissions } = require("discord.js");
const Util = require("./Util.js");
const fs = require("fs");
const { ErelaClient } = require("erela.js");
const { Manager, Player } = require("erela.js");
const config = require('../config.json');

module.exports = class ThunderClient extends Client {
  constructor(options = {}) {
    super({
      disableMentions: "everyone"
    });
    this.validate(options);

    this.commands = new Collection();

    this.aliases = new Collection();

	this.config = config;

    this.guildsData = require("./Guild"); // Guild mongoose model

    this.usersData = require("./User"); // User mongoose model

    this.membersData = require("./Member"); // Member mongoose model

    this.databaseCache = {};

    this.databaseCache.users = new Collection();
    this.databaseCache.members = new Collection();
    this.databaseCache.guilds = new Collection();
    this.events = new Collection();

    this.utils = new Util(this);

    this.owners = options.owners;
	this.queuedEmbed = require('./../utils/music/queuedEmbed.js');
	this.setFilter = require('./../utils/music/setFilter.js')
	this.responses = require('./../utils/misc/responses.js')
	this.formatDuration = require('./../utils/music/formatDuration.js')
	this.formatTime = require('./../utils/music/formatTime.js')
	this.filters = require('../config/filter');
  }
	async findOrCreateMember({ id: memberID, guildID }, isLean){

		if(this.databaseCache.members.get(`${memberID}${guildID}`)){

			return isLean ? this.databaseCache.members.get(`${memberID}${guildID}`).toJSON() : this.databaseCache.members.get(`${memberID}${guildID}`);

		} else {

			let memberData = (isLean ? await this.membersData.findOne({ guildID, id: memberID }).lean() : await this.membersData.findOne({ guildID, id: memberID }));

			if(memberData){

				if(!isLean) this.databaseCache.members.set(`${memberID}${guildID}`, memberData);

				return memberData;

			} else {

				memberData = new this.membersData({ id: memberID, guildID: guildID });

				await memberData.save();

				const guild = await this.findOrCreateGuild({ id: guildID });

				if(guild){

					guild.members.push(memberData._id);

					await guild.save();

				}

				this.databaseCache.members.set(`${memberID}${guildID}`, memberData);

				return isLean ? memberData.toJSON() : memberData;

			}

		}

	};

	async findOrCreateUser({ id: userID }, isLean){

		if(this.databaseCache.users.get(userID)){

			return isLean ? this.databaseCache.users.get(userID).toJSON() : this.databaseCache.users.get(userID);

		} else {

			let userData = (isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID }));

			if(userData){

				if(!isLean) this.databaseCache.users.set(userID, userData);

				return userData;

			} else {

				userData = new this.usersData({ id: userID });

				await userData.save();

				this.databaseCache.users.set(userID, userData);

				return isLean ? userData.toJSON() : userData;

			}

		}

	};

	async findOrCreateGuild({ id: guildID }, isLean){

		if(this.databaseCache.guilds.get(guildID)){

			return isLean ? this.databaseCache.guilds.get(guildID).toJSON() : this.databaseCache.guilds.get(guildID);

		} else {

			let guildData = (isLean ? await this.guildsData.findOne({ id: guildID }).populate("members").lean() : await this.guildsData.findOne({ id: guildID }).populate("members"));

			if(guildData){

				if(!isLean) this.databaseCache.guilds.set(guildID, guildData);

				return guildData;

			} else {

				guildData = new this.guildsData({ id: guildID });

				await guildData.save();

				this.databaseCache.guilds.set(guildID, guildData);

				return isLean ? guildData.toJSON() : guildData;

			}

		}

	}

    

	// This function is used to resolve a user from a string

	async resolveUser(search){

		let user = null;

		if(!search || typeof search !== "string") return;

		// Try ID search

		if(search.match(/^<@!?(\d+)>$/)){

			const id = search.match(/^<@!?(\d+)>$/)[1];

			user = this.users.fetch(id).catch(() => {});

			if(user) return user;

		}

		// Try username search

		if(search.match(/^!?(\w+)#(\d+)$/)){

			const username = search.match(/^!?(\w+)#(\d+)$/)[0];

			const discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];

			user = this.users.find((u) => u.username === username && u.discriminator === discriminator);

			if(user) return user;

		}

		user = await this.users.fetch(search).catch(() => {});

		return user;

	}

	async resolveMember(search, guild){

		let member = null;

		if(!search || typeof search !== "string") return;

		// Try ID search

		if(search.match(/^<@!?(\d+)>$/)){

			const id = search.match(/^<@!?(\d+)>$/)[1];

			member = await guild.members.fetch(id).catch(() => {});

			if(member) return member;

		}

		// Try username search

		if(search.match(/^!?(\w+)#(\d+)$/)){

			guild = await guild.fetch();

			member = guild.members.cache.find((m) => m.user.tag === search);

			if(member) return member;

		}

		member = await guild.members.fetch(search).catch(() => {});

		return member;

	}

	async resolveRole(search, guild){

		let role = null;

		if(!search || typeof search !== "string") return;

		// Try ID search

		if(search.match(/^<@&!?(\d+)>$/)){

			const id = search.match(/^<@&!?(\d+)>$/)[1];

			role = guild.roles.cache.get(id);

			if(role) return role;

		}

		// Try name search

		role = guild.roles.cache.find((r) => search === r.name);

		if(role) return role;

		role = guild.roles.cache.get(search);

		return role;

	}

  validate(options) {
    if (typeof options !== "object")
      throw new TypeError("Options should be a type of Object.");

    if (!options.token)
      throw new Error("You must pass the token for the client.");

    this.token = options.token;

    if (!options.prefix)
      throw new Error("You must pass a prefix for the client.");

    if (typeof options.prefix !== "string")
      throw new TypeError("Prefix should be a type of String.");

    this.prefix = options.prefix;

    if (!options.defaultPerms)
      throw new Error("You must pass default perm(s) for the Client.");

    this.defaultPerms = new Permissions(options.defaultPerms).freeze();
  }

  async start(token = this.token) {
    this.utils.loadCommands();

    this.utils.loadEvents();

    await super.login(token);
  }
};
