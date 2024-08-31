const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    paymentId : {type : String},
    
    car : {
        type : mongoose.Schema.Types.ObjectID ,
         ref:'cars'
    },

    user : {
        type : mongoose.Schema.Types.ObjectID ,
         ref:'users'
    },

    bookedTimeSlots : {
        from : { type : String},
         to : {type : String}
    },
    totalHours : {type : Number},

    totalAmount : {type : Number},

    name : { type : String },

    address : {
        type:String
    },

    email : {
        type:String
    },

    contact : {
        type:String
    },

    transactionId : {type : String},

    driverRequired : {type : Boolean}

    
            
}, {timestamps : true}

)

const bookingModel = mongoose.model('bookings' , bookingSchema)
module.exports = bookingModel