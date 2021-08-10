const { Router } = require("express");
const router = Router();
const Bike_rented_list = require("../models/BikeRented");

router.post("/add", async function (req, res) {
  try {
    const { name, type, rentPrice, rentTime } = req.body;
    const date = new Date();
    const bike = new Bike_rented_list({
      name,
      type,
      rentPrice,
      dateOfRent: date,
      rentTime,
    });
    await bike.save();
    res.status(200).json({ message: "Bike has been added" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/", async function (req, res) {
  try {
    const bikes = await Bike_rented_list.find({});
    res.status(202).json({ bikes });
  } catch (e) {
    res.status(500).json({ message: "Error..." });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const bike = await Bike_rented_list.findById(id);
    res.status(200).json({ bike });
  } catch (e) {
    res.status(500).json({ message: "Error.." });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await Bike_rented_list.findByIdAndDelete(id);
    res.status(203).json({ message: "Bike has been deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error..." });
  }
});

module.exports = router;
