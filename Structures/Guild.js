const mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	config = require("../config.json");

module.exports = mongoose.model("Guild", new Schema({

	/* REQUIRED */
	id: { type: String }, // Discord ID of the guild
    
	/* MEMBERSDATA */
	membersData: { type: Object, default: {} }, // Members data of the guild
	members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
	prefix: { type: String, default: config.prefix }, // Default or custom prefix of the guild


		automod: {
			enabled: false, // Whether the auto moderation is enabled
			ignored: [] // The channels in which the auto moderation is disabled
		},
	modlogs: false,
	commands: { type: Array, default: [] }, // Commands logs
	disabledCategories: { type: Array, default: [] } // Disabled categories
}));