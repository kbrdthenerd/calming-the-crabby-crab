import { Crab } from '../objects/crab'
import crabImageUrl from '../assets/crab.png'
import backgroundImageUrl from '../assets/background.png'

export class MainScene extends Phaser.Scene {
  private crab: Crab

  constructor() {
    super({
      key: 'MainScene'
    })
  }

  preload(): void {
    this.load.image('crab', crabImageUrl)
    this.load.image('background', backgroundImageUrl)
  }
  create(): void {
    this.add.existing(new Phaser.GameObjects.Image(this, 400, 300, 'background'))
    this.crab = new Crab({
      scene: this,
      x: 450,
      y: 450,
      key: 'crab'
    })
  }

  update(): void {
    this.crab.update()
  }

}
