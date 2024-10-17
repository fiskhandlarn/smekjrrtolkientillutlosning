import { GameObjects, Scene } from 'phaser';

const START_Y_VALUE = -100;

export class Gramophone extends GameObjects.Container
{
  gramofon: GameObjects.Image;
  isEnabled: boolean = false;
  mask: GameObjects.Image;
  note1: GameObjects.Image;
  note2: GameObjects.Image;
  note4: GameObjects.Image;
  notePositions: array;
  noteCounters: array = [0, 0, 0];
  noteYBreakpoints: array = [START_Y_VALUE, -200, -300];

  constructor(scene: Scene, x: number, y: number, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.gramofon = this.scene.add.image(x, y, 'gramofon');

    this.note1 = this.scene.add.image(457, START_Y_VALUE, 'not1');
    this.note2 = this.scene.add.image(461, START_Y_VALUE, 'not2');
    this.note4 = this.scene.add.image(460, START_Y_VALUE, 'not4');

    this.notePositions = [
      {note: this.note1, x: 457, y: 234},
      {note: this.note2, x: 461, y: 233},
      {note: this.note4, x: 460, y: 234},
    ];

    this.mask = this.scene.add.image(439, 235, 'gram_mask2');

    this.disable();
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;

    this.note1.y = START_Y_VALUE;
    this.note2.y = START_Y_VALUE;
    this.note4.y = START_Y_VALUE;
  }

  update() {
    // if (this.note1.y !== START_Y_VALUE && this.note2.y !== START_Y_VALUE && this.note4.y  !== START_Y_VALUE) {
    //   console.log('!');

      this.notePositions.forEach((position, key) => {
        if (position.note.y < this.noteYBreakpoints[key] && this.isEnabled) {
          this.noteCounters[key] = 0;
          position.note.y = position.y;
        }

        position.note.x = Math.sin(this.noteCounters[key]) * 10 + 444;
        position.note.y = position.note.y - 2;
        this.noteCounters[key] = this.noteCounters[key] + 0.11; // original: 0.10000000000000001;
      });
    //}
  }
}
