import { Crab, CrabState } from '../objects/crab'
import crabImageUrl from '../assets/crab.png'
import backgroundImageUrl from '../assets/fancyBackground.png'
import { Scene, Input, GameObjects } from 'phaser'
import { Comforts } from '../objects/comforts'
import { Intro } from '../objects/intro'
import { End } from '../objects/end'

export class MainScene extends Scene {
  private crab: Crab
  private comforts: Comforts
  private comfortKey: Input.Keyboard.Key
  private restartKey: Input.Keyboard.Key
  private gameStarted: boolean
  private introText: Intro
  private endText: End

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
    this.gameStarted = false

    const background = new Phaser.GameObjects.Image(this, 400, 300, 'background')
    background.displayHeight = 600
    background.displayWidth = 800
    this.add.existing(background)

    this.introText = new Intro({ scene: this })
    this.crab = new Crab({ scene: this })
    this.comforts = new Comforts({ scene: this })

    this.comfortKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    )

    this.restartKey.on('down', () => {
      if (this.crab.state !== CrabState.Deciding) {
        this.crab.destroy()
        this.crab = new Crab({ scene: this })
        this.crab.start()
        this.endText.fade()
      }
    })
    this.comfortKey.on('down', () => {
      if (!this.gameStarted) {
        this.gameStarted = true
        this.crab.start()
        this.introText.fade()
      }
      this.comforts.addComfort()
      this.crab.comfort()
    })
  }

  update(): void {
    if (this.gameStarted && (this.crab.state === CrabState.Deciding)) {
      if (this.crab.happyLevel <= 0) {
        this.crab.state = CrabState.Left
        this.endText = new End({ scene: this, won: false })
      } else if (this.crab.happyLevel >= .95) {
        this.crab.state = CrabState.Staying
        this.endText = new End({ scene: this, won: true })
      } else {
        this.crab.update()
      }
    }
  }

}
