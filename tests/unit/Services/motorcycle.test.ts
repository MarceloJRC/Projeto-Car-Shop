import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Verificar rota /motorcycles', function () {
  describe('POST /Motorcycles', function () {
    it('POST /motorcycles', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      const motorcycleOutput = {
        id: '6348513f34c397abcad040b2',
        model: 'Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };

      sinon.stub(Model, 'create').resolves(motorcycleOutput);
  
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);
  
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Verificar GET /motorcycles', function () {
    it('GET /motorcycles', async function () {
      const motorcycleOutput = [
        {
          _id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          _id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];

      const serviceOutput = [
        {
          id: '634852326b35b59438fbea2f',
          model: 'Honda Cb 600f Hornet',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          id: '634852326b35b59438fbea31',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];

      sinon.stub(Model, 'find').resolves(motorcycleOutput);
  
      const service = new MotorcycleService();
      const result = await service.getAll();
  
      expect(result).to.be.deep.equal(serviceOutput);
    });
  });

  describe('Verificar GET /motorcycles/:id', function () {
    it('GET /motorcycles/:id', async function () {
      const motorcycleOutput = {
        _id: '634852326b35b59438fbea31',
        model: 'Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };

      const serviceOutput = {
        id: '634852326b35b59438fbea31',
        model: 'Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      };
  
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);
  
      const service = new MotorcycleService();
      const result = await service.getById('634852326b35b59438fbea31');

      expect(result).to.be.deep.equal(serviceOutput);
    });
    
    it('GET /motorcyles/:id inexistente', async function () {  
      sinon.stub(Model, 'findById').resolves([]);

      const service = new MotorcycleService();
      const result = await service.getById('12345634852326b35b59438f');

      expect(result?.id).to.be.deep.equal(undefined);
    });
  });

  describe('Verificar PUT /motorcycles', function () {
    it('PUT /motorcycles/:id', async function () {
      const motorcycleUpdated = {
        model: 'Honda',
        year: 2014,
        color: 'Red',
        status: true,
        buyValue: 45.000,
        category: 'Street',
        engineCapacity: 6000,
      };

      sinon.stub(Model, 'updateOne').resolves();

      const service = new MotorcycleService();
      const result = await service.updateMotorcycle('634852326b35b59438fbea31', motorcycleUpdated);

      expect(result).to.be.deep.equal(null);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});