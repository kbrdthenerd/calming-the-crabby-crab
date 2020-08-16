import { Crab } from '../objects/crab'

export class MainScene extends Phaser.Scene {
  private crab: Crab;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("crab", "../assets/crab.png");
  }
  create(): void {
    this.crab = new Crab({
      scene: this,
      x: 450,
      y: 450,
      key: "crab"
    });
  }

  update(): void {
    this.crab.update()
  }

}
