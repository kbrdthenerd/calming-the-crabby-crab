import { Crab, CrabState } from '../objects/crab'
import crabImageUrl from '../assets/crab.png'
import backgroundImageUrl from '../assets/background.png'
import { Scene, Input } from 'phaser'
import { Comforts } from '../objects/comforts'

export class MainScene extends Scene {
  private crab: Crab
  private comfortKey: Input.Keyboard.Key
  private comforts: Comforts

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
    this.comforts = new Comforts({ scene: this })

    this.comfortKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    this.comfortKey.on('down', () => {
      const spike = Math.random() < 0.1
      const changeAmount = (spike && Math.floor(Math.random() * 50) + 40) || Math.floor(Math.random() * 10) + 5
      this.comforts.addComfort()
      this.crab.changeColor(changeAmount)
    })
  }

  update(): void {
    if (this.crab.state === CrabState.Deciding) {
      if (this.crab.happyLevel <= 0) {
        this.crab.state = CrabState.Left
      } else if (this.crab.happyLevel >= .95) {
        this.crab.state = CrabState.Staying
      } else {
        this.crab.update()
      }
    }
  }

}
