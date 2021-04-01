const mongoose = require("mongoose"); 
const config = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId, 
    guild : String , 
    warnDm : Boolean, 
    warnKick : Number , 
    muteRole : String
})
module.exports = new mongoose.model("Config " , config);