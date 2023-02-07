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

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleList = await motorcycleODM.getAll();
    return motorcycleList.map((motorcycle) => ({ id: motorcycle._id,
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
      category: motorcycle.category,
      engineCapacity: motorcycle.engineCapacity }));
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleId = await motorcycleODM.getById(id);
    if (!motorcycleId) return null;
    return {
      id: motorcycleId._id,
      model: motorcycleId.model,
      year: motorcycleId.year,
      color: motorcycleId.color,
      status: motorcycleId.status,
      buyValue: motorcycleId.buyValue,
      category: motorcycleId.category,
      engineCapacity: motorcycleId.engineCapacity };
  }

  public async updateMotorcycle(id: string, updatedMotorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.updateMotorcycle(id, updatedMotorcycle);

    if (!newMotorcycle) return null;
    return { id, ...updatedMotorcycle };
  }
}