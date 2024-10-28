import dataFileManager from "../utils/DataFileManager.mjs";

class Car {
  static loadCarsData() {
    try {
      return dataFileManager.loadData();
    } catch (error) {
      throw new Error("Не вдалося завантажити список автомобілів");
    }
  }
  static addNewCar(carObj) {
    try {
      dataFileManager.addItem({ id: new Date().getTime(), ...carObj });
    } catch (error) {
      throw new Error("Операція додавання не вдалася");
    }
  }
  static deleteCar(id) {
    try {
      dataFileManager.deleteItemById(id);
    } catch (error) {
      throw new Error("Операція видалення не вдалася");
    }
  }
  static getCarData(id) {
    try {
      return dataFileManager.getItemById(id);
    } catch (error) {
      throw new Error("Операція пошуку не вдалася");
    }
  }
  static updateCar(id, carData) {
    try {
      dataFileManager.updateItemById(id, carData);
    } catch (error) {
      throw new Error("Операція оновлення не вдалася");
    }
  }
}

export default Car;
