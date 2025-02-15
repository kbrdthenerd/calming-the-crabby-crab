import { GameObjects, Display } from 'phaser'

export class Crab extends GameObjects.Image {
  private color: Display.Color
  private eyes: GameObjects.Image
  private encourageText: GameObjects.Text
  public happyLevel: number

  constructor(params) {
    const { scene } = params
    super(scene, 550, 475, 'crab')
    this.displayHeight = 261.8
    this.displayWidth = 350
    this.happyLevel = 0.4
    this.color = new Display.Color(128, 0, 127)
    this.tint = this.color.color
    this.alpha = this.happyLevel
    this.state = CrabState.Deciding
    this.eyes = new GameObjects.Image(scene, 550, 475, 'crabEyes')
    this.eyes.alpha = this.happyLevel
    this.eyes.displayHeight = 261.8
    this.eyes.displayWidth = 350

    this.encourageText = new GameObjects.Text(scene, 620, 400, 'Please don\'t give up on me',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff', fontSize: '12px'
    })
    this.encourageText.alpha = 0
    scene.add.existing(this.encourageText)

    scene.add.existing(this)
    scene.add.existing(this.eyes)
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
    this.eyes.alpha = this.happyLevel
    if (this.happyLevel <= 0.2 && this.happyLevel > 0) {
      this.encourageText.text = (red - blue > 0 && 'I need some space') || 'Please don\'t give up on me'
      this.encourageText.alpha = 1
    } else {
      this.scene.tweens.add({
        targets: this.encourageText,
        alpha: 0,
        duration: 1000,
      })
    }
  }


  remove() {
    this.eyes.destroy()
    this.destroy()
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