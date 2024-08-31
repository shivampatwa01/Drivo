const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    
    name : {
        type : String,
        require : true
    },

    image : {
        type : String ,
         require : true
    },

    rentPerHour : {
        type : String ,
        require : true
    },

    capacity : {
        type : Number,
         require : true
    },

    fuelType : {
        type : String,
         require : true
    },

    bookedTimeSlots : [
        {
            from : {
                type : String,
                 require : true
            },
            
            to : {
                type : String,
                 require : true
            }

        }
    ],
}, {timestamps : true}

)

const carModel = mongoose.model('cars' , carSchema)
module.exports = carModel