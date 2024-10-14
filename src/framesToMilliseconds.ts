import { FPS } from './main';

export function framesToMilliseconds(frames: integer):integer {
  return frames * (1000 / FPS);
}
