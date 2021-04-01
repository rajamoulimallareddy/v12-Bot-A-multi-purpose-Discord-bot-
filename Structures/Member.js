const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({

	/* REQUIRED */
	id: { type: String }, // Discord ID of the user
	guildID: { type: String }, // ID of the guild to which the member is connected


	/* OTHER INFORMATIONS */
afk: {type: String, default: null},
afktime: {type: String, default: null},
	warnings: { type: Array, default: [] },
	sanctions: {type: Array, default: []},
	mute: { type: Object, default: { 
		muted: false,
		case: null,
		endDate: null
	}}

}))