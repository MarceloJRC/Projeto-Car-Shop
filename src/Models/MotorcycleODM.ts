import { Model, Schema, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
  
export default class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;
  
  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      engineCapacity: { type: Number, required: true },
      category: { type: String, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  
  public async create(Motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...Motorcycle });
  }

  public async getAll() {
    return this.model.find();
  }

  public async getById(id: string) {
    return this.model.findById(id);
  }

  public async updateMotorcycle(id: string, newMotorcycle: IMotorcycle) {
    return this.model.updateOne({ _id: id }, { ...newMotorcycle });
  }
}