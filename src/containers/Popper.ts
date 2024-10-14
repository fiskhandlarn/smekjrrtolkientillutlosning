import { GameObjects } from 'phaser';

export class Popper extends GameObjects.Container
{
  popper: GameObjects.Image;
  originX: number;
  originY: number;
  backPlacefromX: number;
  backPlacefromY: number;
  backPlaceMoving = false;
  playPoppersAnim = false;
  poppersState = false;
  backPlaceCount = 1;
  playPoppersAnimCount: number = 0;

  constructor(scene, x, y, children) {
    super(scene, x, y, children);

    this.originX = x;
    this.originY = y;

    this.popper = this.scene.add.image(x, y, 'poppers');
    this.popper.setInteractive();

    this.scene.input.setDraggable(this.popper);

    this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.scene.input.on('dragstart', () => {
      this.scene.input.setDefaultCursor("grabbing");

      if (true /* TODO: parentScript.handPenisState = 0 */) {
        /* TODO:
        sprite(spriteNum).locZ = parentScript.spriteZ
        parentScript.spriteZ = parentScript.spriteZ + 1
         */
        this.poppersState = true;
      }
    });

    this.scene.input.on('dragend', () => {
      this.scene.input.setDefaultCursor("grab");

      if (this.originX !== this.popper.x && this.originY !== this.popper.y) {
        if (false /* TODO: sprite(spriteNum).intersects(parentScript.intersectSprite) */) {
          // if (parentScript.readyToCome = 0) {
          //   parentScript.excitementAction = 5
          //   parentScript.doAction()
          // }
          // this.backPlaceMoving = false;
          // parentScript.playPoppersAnim = 1
        } else {
          this.backPlaceMoving = true;
          this.playPoppersAnim = false;
        }

        this.poppersState = false;
        this.backPlacefromX = this.popper.x;
        this.backPlacefromY = this.popper.y;
        this.backPlaceCount = 1;
        this.playPoppersAnimCount = 0;
      }
    });

    this.popper.on('pointerover', () => {
      this.scene.input.setDefaultCursor("grab");
    });

    this.popper.on('pointerout', () => {
      this.scene.input.setDefaultCursor("default");
    });

    // TODO animation

    console.log((1 - Math.cos((1 * 10) / 100 * Math.PI)) / 2);
    console.log((1 - Math.cos((10 * 10) / 100 * Math.PI)) / 2);
    //(1 - Math.cos((9 * 10) / 100 * PI)) / 2;


  }

  update() {
    if (this.backPlaceMoving) {
      let percent = (1 - Math.cos((this.backPlaceCount * 10) / 100 * Math.PI)) / 2;
      this.popper.x = ((1 - percent) * this.backPlacefromX) + (percent * this.originX);
      this.popper.y = ((1 - percent) * this.backPlacefromY) + (percent * this.originY);
      this.backPlaceCount++;

      console.log(
        'update moving back',
        percent,
        this.backPlaceMoving,
        this.playPoppersAnim,
        this.poppersState,
        this.backPlacefromX,
        this.backPlacefromY,
        this.backPlaceCount,
      );
    }

    if (this.backPlaceCount > 9) {
      this.backPlaceMoving = false;
      console.log(
        'update: stop moving back',
        this.backPlaceCount,
      );
    }

    if (this.playPoppersAnim) {
      console.log(
        'update play anim',
        this.backPlaceMoving,
        this.playPoppersAnim,
        this.poppersState,
        this.backPlacefromX,
        this.backPlacefromY,
        this.backPlaceCount,
      );

      // switch (this.playPoppersAnimCount) {
      // case 1:
      //   sprite(spriteNum).member = "popperanim1"
      //   break;
      // case 2:
      //   sprite(spriteNum).member = "popperanim2"
      //   break;
      // case 3:
      //   sprite(spriteNum).member = "popperanim3"
      //   break;
      // case 4:
      //   sprite(spriteNum).member = "popperanim4"
      //   break;
      // case 5:
      //   sprite(spriteNum).member = "popperanim5"
      //   break;
      // }

      // if (this.playPoppersAnimCount > 5) {
      //   sprite(spriteNum).member = "poppers"
      //   this.backPlaceMoving = true;
      //   this.playPoppersAnim = false;
      //   this.playPoppersAnimCount = 0;
      // }
      this.playPoppersAnimCount = this.playPoppersAnimCount + 0.5
    }
  }
}
