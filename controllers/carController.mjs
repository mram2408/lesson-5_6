import Car from "../models/Car.mjs";

import { validationResult } from "express-validator";

class CarController {
  static autopark(req, res) {
    res.render("autopark", { title: "Автопарк", carsList: Car.loadCarsData() });
  }
  static createCar(req, res) {
    res.render("addCar", {
      title: "Додати новий автомобіль",
      errors: [],
      carData: {},
    });
  }
  static addCar(req, res) {
    const data = req.body;
    const errors = validationResult(req);
    console.log("====errors====");
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).render("addCar", {
        title: "Додати новий автомобіль",
        errors: errors.array(),
        carData: data,
      });
    }

    const carData = { imgSrc: req.file.filename, ...req.body };
    Car.addNewCar(carData);
    res.redirect("autopark");
  }
  static deleteCar(req, res) {
    Car.deleteCar(req.body.id);
    res.send(200, { success: true });
    res.redirect("/autopark");
  }
  static updateCarForm(req, res) {
    res.render("addCar", {
      title: "Змінити дані про авто",
      errors: [],
      carData: Car.getCarData(req.params.id),
    });
  }
  static updateCar(req, res) {
    const carData = { imgSrc: req.file.filename, ...req.body };
    Car.updateCar(req.params.id, carData);
    res.redirect("/autopark");
  }
}

export default CarController;
