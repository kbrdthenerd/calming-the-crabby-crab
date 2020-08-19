import { GameObjects, Input, Display } from 'phaser'

export class Crab extends GameObjects.Image {
  private color: Display.Color
  public happyLevel: number

  constructor(params) {
    const { scene } = params
    super(scene, 550, 500, 'crab')
    this.displayHeight = 125
    this.displayWidth = 350
    this.happyLevel = 0.3
    this.color = new Display.Color(128, 0, 127)
    this.tint = this.color.color
    this.alpha = this.happyLevel
    this.state = CrabState.Deciding

    scene.add.existing(this)
  }

  start() {
    const TimerEventConfig = {
      delay: 1000,
      loop: true,
      callback: this.randomColorChange,
      callbackScope: this
    }
    
    this.scene.time.addEvent(TimerEventConfig)
  }

  randomColorChange() {
    this.changeColor(-(Math.floor(Math.random() * 10) + 5))
  }

  comfort() {
    const spike = Math.random() < 0.1
    const changeAmount = (spike && Math.floor(Math.random() * 50) + 40) || Math.floor(Math.random() * 10) + 5
    this.changeColor(changeAmount)
  }

  update(): void {
    const { color: { red, blue } } = this
    if (Math.abs(red - blue) > 50 && this.happyLevel > 0) { 
      this.happyLevel-= 0.001
    } else if (Math.abs(red - blue) < 50 && this.happyLevel < 1) this.happyLevel+= 0.001
    this.tint = this.color.color
    this.alpha = this.happyLevel
}


  changeColor(amount): void {
      const { color: { red, green, blue } } = this
      const newBlue = blue - amount
      const newNewBlue = (newBlue < 0 && 0) || (newBlue > 255 && 255) || newBlue 
      const newRed = red + amount
      const newNewRed = (newRed < 0 && 0) || (newRed > 255 && 255) || newRed
      this.color = new Display.Color(newNewRed, green, newNewBlue)
  }
}

export enum CrabState {
  Left = 1,
  Staying = 2,
  Deciding = 0
}