import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);

      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAll();
    return this.res.status(200).json(cars);
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const regexCarId = /^[a-f\d]{24}$/i;

      if (!regexCarId.test(id)) { 
        return this.res.status(422).json({ message: 'Invalid mongo id' }); 
      }
      const motorcycleId = await this.service.getById(id);

      if (!motorcycleId) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycleId);
    } catch (error) {
      this.next(error);
    }
  }
}