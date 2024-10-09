import { config } from './main';

let startTime: integer;

export function logWithTime(message: string) {
  if (!startTime) {
    startTime = Date.now();
  }

  const frame = ((Date.now() - startTime) / config.fps.target);
  console.log(message, Math.round(frame), '(' + frame + ')');
};
