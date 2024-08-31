const Car = require("../models/carModel")

exports.carControll = async(req, res) => {

    try {
        const cars = await Car.find()
        res.send(cars)
    } catch(error) {
        return res.status(400).json(error);
    }
}

exports.addCarControll = async(req, res) => {
   
    try {
        const newcar = new Car(req.body)
        await newcar.save()
        res.send('car added successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.editCarControll = async(req, res) => {
    const { _id, name, image, rentPerHour, capacity, fuelType } = req.body;
    try {
        const car = await Car.findOne({ _id });
        car.name = name;
        car.image = image ;        
        car.rentPerHour = rentPerHour;
        car.capacity = capacity;
        car.fuelType = fuelType;
        //update all details or click spacetab and backspace, here car details are updated manually to secure change in time slots
       
        await car.save();
        res.send('car details updated successfully');

    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.deleteCarControll = async (req, res) => {
    const { carid } = req.body; 
    try {
       
        if (!carid) {
            return res.status(400).json({ error: 'Car ID is required' });
        }
        const result = await Car.findByIdAndDelete(carid);

        if (!result) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json({ message: 'Car deleted successfully' });

    } catch (error) {
        return res.status(400).json(error);
    }
}
