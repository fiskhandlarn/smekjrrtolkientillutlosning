import { config } from './main';

let startTime: integer;

export function logWithTime(message: string) {
  if (!startTime) {
    startTime = Date.now();
  }

  console.log(message, ((Date.now() - startTime) / config.fps.target));
};
