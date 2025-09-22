import SHADER1 from './shaders/shader-1';
import SHADER2 from './shaders/shader-2';
import SHADER3 from './shaders/shader-3';
import SHADER4 from './shaders/shader-4';
import SHADER5 from './shaders/shader-5';

export type TShaders = {
  name: string;
  shader: string;
};

export const SHADERS_LIST: TShaders[] = [
  {
    name: 'Palm',
    shader: SHADER1,
  },
  {
    name: 'Waves',
    shader: SHADER2,
  },
  {
    name: 'Drop lines',
    shader: SHADER3,
  },
  {
    name: 'Microwaves',
    shader: SHADER4,
  },
  {
    name: 'Pulse',
    shader: SHADER5,
  },
];
