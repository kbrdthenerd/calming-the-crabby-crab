import { GameObjects, Input, Display } from 'phaser'

export class Crab extends GameObjects.Image {
  private color: Display.Color
  private happyLevel: number
  private left: boolean
  private staying: boolean

  constructor(params) {
    const { scene, x, y, key, frame } = params
    super(scene, x, y, key, frame)
    this.happyLevel = 0.5
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
    this.changeColor(-(Math.floor(Math.random() * 10) + 5))
  }

  update(): void {
    const { color: { red, blue }, left, staying } = this
    if (!left && !staying) {
      if (this.happyLevel <= 0) {
        this.left = true
        console.log('left')
      } else if (this.happyLevel >= .95) {
        this.staying = true
        console.log('staying')
      } else {
        if (Math.abs(red - blue) > 50 && this.happyLevel > 0) { 
          this.happyLevel-= 0.001
        } else if (Math.abs(red - blue) < 50 && this.happyLevel < 1) this.happyLevel+= 0.001
        this.tint = this.color.color
        this.alpha = this.happyLevel
      }
    }
  }

  changeColor(amount): void {
    if (!this.left && !this.staying) {
      const { color: { red, green, blue } } = this
      this.color = new Display.Color(red + amount, green, Math.max(0, blue - amount))
    }
  }
}