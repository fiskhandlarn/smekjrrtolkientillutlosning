import { GameObjects } from 'phaser';

export class GramophoneButton extends GameObjects.Container
{
  activeButton: GameObjects.Image;
  inactiveButton: GameObjects.Image;
  isActive: boolean = false;

  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.activeButton = this.scene.add.image(x, y, 'buttonActive');
    this.inactiveButton = this.scene.add.image(x, y, 'buttonInActive');

    const hitarea = this.scene.add.zone(x, y, this.activeButton.width, this.activeButton.height);
    hitarea.setInteractive();
    hitarea.on('pointerdown', () => {
      this.toggle();
    });

    this.disable();
  }

  disable() {
    this.isActive = false;
    this.activeButton.visible = false;
    this.inactiveButton.visible = true;
  }

  toggle() {
    this.isActive = !this.isActive;

    // keep showing active regardless of how many times this button is toggled
    this.activeButton.visible = true;
    this.inactiveButton.visible = false;

    this.scene.events.emit('toggle', this);
  }
}
