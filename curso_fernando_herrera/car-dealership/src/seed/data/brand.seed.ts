import { v4 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';
// interfaces o clases que no tinen dependencias si se pueden importar aún si no están dentro del módulo

export const BRAND_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'volvo',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Honda',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Jeep',
    createAt: new Date().getTime(),
  },
  {
    id: uuid(),
    name: 'Tesla',
    createAt: new Date().getTime(),
  },
];
