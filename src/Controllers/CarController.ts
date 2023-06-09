import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
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
      const carId = await this.service.getById(id);

      if (!carId) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(carId);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCar() {
    try {
      const { id } = this.req.params;
      const newCar = this.req.body;

      const idRegex = /^[a-f\d]{24}$/i;
      if (!idRegex.test(id)) return this.res.status(422).json({ message: 'Invalid mongo id' });

      const getCar = await this.service.getById(id);
      if (getCar === null) return this.res.status(404).json({ message: 'Car not found' });

      const updatedCar = await this.service.updateCar(id, newCar);
      return this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }
}
