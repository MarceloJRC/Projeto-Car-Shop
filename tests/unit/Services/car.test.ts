import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Verificar rota /cars', function () {
  describe('POST /cars', function () {
    it('POST /cars', async function () {
      const carInput: ICar = {
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      const carOutput = {
        id: '6348513f34c397abcad040b2',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.990,
        doorsQty: 4,
        seatsQty: 5,
      };

      sinon.stub(Model, 'create').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.create(carInput);
  
      expect(result).to.be.deep.equal(carOutput);
    });
  });

  describe('Verificar GET /cars', function () {
    it('GET /cars', async function () {
      const carOutput = [
        {
          _id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          _id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];

      const serviceOutput = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Marea',
          year: 2002,
          color: 'Black',
          status: true,
          buyValue: 15.99,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Tempra',
          year: 1995,
          color: 'Black',
          status: false,
          buyValue: 39,
          doorsQty: 2,
          seatsQty: 5,
        },
      ];

      sinon.stub(Model, 'find').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.getAll();
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
  });

  describe('Verificar GET /cars/:id', function () {
    it('GET /cars/:id', async function () {
      const carOutput = {
        _id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };

      const serviceOutput = {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      };
  
      sinon.stub(Model, 'findById').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea2f');

      expect(result).to.be.deep.equal(serviceOutput);
    });

    it('GET /cars/:id inexistente', async function () {  
      sinon.stub(Model, 'findById').resolves([]);

      const service = new CarService();
      const result = await service.getById('12345634852326b35b59438f');

      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Verificar PUT /cars', function () {
    it('PUT /cars/:id', async function () {
      const carUpdated = {
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.000,
        doorsQty: 2,
        seatsQty: 5,
      };

      sinon.stub(Model, 'updateOne').resolves();

      const service = new CarService();
      const result = await service.updateCar('634852326b35b59438fbea2f', carUpdated);

      expect(result).to.be.deep.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});