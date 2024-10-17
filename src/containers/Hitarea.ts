import { GameObjects, Geom, Scene } from 'phaser';

export class Hitarea extends GameObjects.Container
{
  hitarea: GameObjects.T;
  colliders: Array<GameObjects.GameObject> = [];

  constructor(scene: Scene, x: number, y: number, width: number, height: number, children?: Array<GameObjects.GameObject>) {
    super(scene, x, y, children);

    this.hitarea = this.scene.add.zone(x, y, width, height);
    this.scene.physics.add.existing(this.hitarea, false);
    this.scene.physics.world.enable(this.hitarea);
  }

  addCollider(collider: GameObjects.GameObject) {
    this.scene.physics.add.existing(collider);
    collider.wasTouching = false;
    this.colliders.push(collider);

    this.update();
  }

  // https://samme.github.io/phaser-examples-mirror/sprites/overlap%20tween%20without%20physics.html
  isOverlapping(spriteA: GameObjects.GameObject, spriteB: GameObjects.GameObject) {
    const intersection = Geom.Rectangle.Intersection(spriteA.getBounds(), spriteB.getBounds());
    return intersection.width > 0 && intersection.height > 0;
  }

  update() {
    // https://codepen.io/samme/pen/WaZQOX?editors=0010
    if (this.hitarea) {

      this.colliders.forEach((collider) => {
        // https://codepen.io/samme/pen/WaZQOX?editors=0010
        const touching = this.isOverlapping(this.hitarea, collider);
        const wasTouching = collider.wasTouching;

        if (touching && !wasTouching) {
          this.emit('overlapstart', collider);
        } else if (!touching && wasTouching) {
          this.emit('overlapend', collider);
        }

        collider.wasTouching = touching;
      });
    }
  }
}
