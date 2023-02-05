import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return new Car({
      id: newCar.id,
      model: newCar.model,
      year: newCar.year,
      color: newCar.color,
      status: newCar.status,
      buyValue: newCar.buyValue,
      doorsQty: newCar.doorsQty,
      seatsQty: newCar.seatsQty,
    });
  }

  public async getAll() {
    const carODM = new CarODM();
    const carsList = await carODM.getAll();
    return carsList.map((car) => ({ id: car._id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty }));
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const carId = await carODM.getById(id);
    if (!carId) return null;
    return {
      id: carId._id,
      model: carId.model,
      year: carId.year,
      color: carId.color,
      status: carId.status,
      buyValue: carId.buyValue,
      doorsQty: carId.doorsQty,
      seatsQty: carId.seatsQty };
  }

  public async updateCar(id: string, updatedCar: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.updateCar(id, updatedCar);

    if (!newCar) return null;
    return { id, ...updatedCar };
  }
}