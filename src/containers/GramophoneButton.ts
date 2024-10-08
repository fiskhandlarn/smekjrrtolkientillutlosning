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

    this.updateState();
  }

  disable() {
    this.isActive = false;
    this.updateState();
  }

  toggle() {
    this.isActive = !this.isActive;
    this.updateState();
    this.scene.events.emit('toggle', this);
  }

  updateState() {
    this.activeButton.visible = this.isActive;
    this.inactiveButton.visible = !this.isActive;
  }
}
