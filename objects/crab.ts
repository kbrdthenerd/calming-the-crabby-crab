import { GameObjects, Input, Display } from 'phaser'

export class Crab extends GameObjects.Image {
  private color: Display.Color
  private happyLevel: number

  constructor(params) {
    const { scene, x, y, key, frame } = params
    super(scene, x, y, key, frame)
    this.happyLevel = 1
    this.color = new Display.Color(128, 0, 127)

    const TimerEventConfig = {
      delay: 1000,
      loop: true,
      callback: this.randomColorChange,
      callbackScope: this
    }
    
    scene.time.addEvent(TimerEventConfig)

    scene.add.existing(this)
  }

  randomColorChange() {
    this.changeColor(-Math.floor(Math.random() * 10))
  }

  update(): void {
    const { color: { red, blue } } = this
    if (Math.abs(red - blue) > 50) { 
      this.happyLevel-= 0.01
    } else if (Math.abs(red - blue) < 50) this.happyLevel+= 0.01
    this.tint = this.color.color
    this.alpha = this.happyLevel
  }

  changeColor(amount): void {
    const { color: { red, green, blue } } = this
    this.color = new Display.Color(red + amount, green, Math.max(0, blue - amount))
  }
}