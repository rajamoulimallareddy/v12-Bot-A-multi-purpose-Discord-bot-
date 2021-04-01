
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

  _id: {type: mongoose.Schema.Types.ObjectId, required: true},

  name: {type: String, default: "warns"},

  serverid: {type: String, required: true},

  userid: {type: String, required: true},

  warnings: {type: Array, default: []}

})

module.exports = mongoose.model("warns", productSchema)