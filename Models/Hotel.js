const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const hotelSchema = new mongoose.Schema({
    userInformation:{
        type:ObjectId,
        ref:'User',
        required:true
    },
    pic:[String],
    description:{
        type:String,
        required:true
    },
    bookingHistory:[{
        type:ObjectId,
        ref:"Booking",
        required:true
    }]
},)

const Hotel = mongoose.model("Hotel",hotelSchema)

module.exports = Hotel