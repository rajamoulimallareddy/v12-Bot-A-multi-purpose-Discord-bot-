const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	/* REQUIRED */	id: { type: String }, // Discord ID of the user

	/* STATS */

	registeredAt: { type: Number, default: Date.now() }, // Registered date of the user

	reminds: { type: Array, default: [] }, // the reminds of the user

})

module.exports = mongoose.model("User", userSchema)