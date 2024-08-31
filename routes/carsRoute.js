const express = require("express");
const { carControll, addCarControll, editCarControll, deleteCarControll } = require("../controllers/carController");
const router = express.Router();


router.get("/getallcars", carControll);
router.post("/addcar", addCarControll);
router.post("/editcar", editCarControll);
router.post("/deletecar", deleteCarControll);

module.exports = router;