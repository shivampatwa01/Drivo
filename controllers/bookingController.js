
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: "rzp_test_8EtWJTXuU2CFNF",
  key_secret: process.env.KEY_SECRET,
});


exports.bookingControl = async (req, res) => {
  const { paymentId } = req.body; 

  try {
    // const payment = await razorpay.payments.fetch(paymentId);

    // if (payment.status !== "captured") {
    //   return res.status(400).json({ error: "Payment verification failed." });
    // }

    req.body.transactionId = paymentId;
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const car = await Car.findOne({ _id: req.body.car });
    if (car) {
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await car.save();
    }

    res.send("Your booking is successful");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// Endpoint to create a new order and initiate payment
exports.createOrder = async (req, res) => {
    const { amount } = req.body;

  try {
    console.log(amount);
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: uuidv4(), 
    };

    const order = await razorpay.orders.create(options);

    // const newOrder = new Order({
    //     amount: options.amount / 100, // Convert back to rupees for storage
    //     currency: options.currency,
    //     receipt: options.receipt,
    //     razorpayOrderId: order.id,
    //     name,
    //     email,
    //     address, 
    //     contact, 
    //   });
  
    //   await newOrder.save();

    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};


exports.getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
};


