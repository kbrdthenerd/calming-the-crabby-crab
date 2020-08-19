import { Crab, CrabState } from '../objects/crab'
import crabImageUrl from '../assets/crab.png'
import backgroundImageUrl from '../assets/background.png'
import { Scene, Input, GameObjects } from 'phaser'
import { Comforts } from '../objects/comforts'
import { Intro } from '../objects/intro'

export class MainScene extends Scene {
  private crab: Crab
  private comforts: Comforts
  private comfortKey: Input.Keyboard.Key
  private restartKey: Input.Keyboard.Key
  private gameStarted: boolean
  private introText: Intro
  private endText: GameObjects.Text

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
    this.add.existing(new Phaser.GameObjects.Image(this, 400, 300, 'background'))
    this.introText = new Intro({ scene: this })
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

    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    )

    this.restartKey.on('down', () => {
      if (this.crab.state !== CrabState.Deciding) {
        this.crab.destroy()
        this.crab = new Crab({
          scene: this,
          x: 450,
          y: 450,
          key: 'crab'
        })
        this.crab.start()
        this.tweens.add({
          targets: this.endText,
          alpha: 0,
          duration: 1000,
        })
      }
    })

    this.comfortKey.on('down', () => {
      if (!this.gameStarted) {
        this.gameStarted = true
        this.crab.start()
        this.introText.fade()
      } else {
        const spike = Math.random() < 0.1
        const changeAmount = (spike && Math.floor(Math.random() * 50) + 40) || Math.floor(Math.random() * 10) + 5
        this.comforts.addComfort()
        this.crab.changeColor(changeAmount)
      }
    })
  }

  update(): void {
    if (this.gameStarted && (this.crab.state === CrabState.Deciding)) {
      if (this.crab.happyLevel <= 0) {
        this.crab.state = CrabState.Left
        this.endText = new Phaser.GameObjects.Text(this, 100, 100, 'The Crab could not be comforted :( Press enter to try again',{ 
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
        })
        this.add.existing(this.endText)
      } else if (this.crab.happyLevel >= .95) {
        this.crab.state = CrabState.Staying
        this.endText = new Phaser.GameObjects.Text(this, 100, 100, 'The Crab was Comforted :) Press enter to play again',{ 
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
        })
        this.add.existing(this.endText)
      } else {
        this.crab.update()
      }
    }
  }

}
