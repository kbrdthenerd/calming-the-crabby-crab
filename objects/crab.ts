import { GameObjects, Input, Display } from 'phaser'

export class Crab extends GameObjects.Image {
  private color: Display.Color
  public happyLevel: number

  constructor(params) {
    const { scene, x, y, key, frame } = params
    super(scene, x, y, key, frame)
    this.happyLevel = 0.3
    this.color = new Display.Color(128, 0, 127)
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
      this.color = new Display.Color(red + amount, green, Math.max(0, blue - amount))
  }
}

export enum CrabState {
  Left = 1,
  Staying = 2,
  Deciding = 0
}