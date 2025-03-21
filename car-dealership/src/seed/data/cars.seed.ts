import { v4 as uuid } from 'uuid';
import { Car } from 'src/cars/interfaces/car.interface'; // interfaces o clases que no tinen dependencias si se pueden importar aún si no están dentro del módulo

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Honda',
    model: 'Civic',
  },
  {
    id: uuid(),
    brand: 'Jeep',
    model: 'Cherokee',
  },
];
