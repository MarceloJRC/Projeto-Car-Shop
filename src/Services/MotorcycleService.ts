import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);

    return new Motorcycle({
      id: newMotorcycle.id,
      model: newMotorcycle.model,
      year: newMotorcycle.year,
      color: newMotorcycle.color,
      status: newMotorcycle.status,
      buyValue: newMotorcycle.buyValue,
      engineCapacity: newMotorcycle.engineCapacity,
      category: newMotorcycle.category,
    });
  }
}