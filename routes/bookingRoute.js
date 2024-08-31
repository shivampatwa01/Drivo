const express = require("express");
const { bookingControl, getAllBooking, createOrder } = require("../controllers/bookingController");

const router = express.Router(); 


 router.post("/bookcar", bookingControl);
 router.post("/createOrder", createOrder);
 router.get("/getallbookings", getAllBooking);


module.exports = router;