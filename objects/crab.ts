/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Flappy Bird: Bird
 * @license      Digitsensitive
 */

export class Crab extends Phaser.GameObjects.Image {
  private comfortKey: Phaser.Input.Keyboard.Key
  private color: Phaser.Display.Color
  private happyLevel: number

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)
    this.happyLevel = 1
    this.color = new Phaser.Display.Color(127.5, 0, 127.5)
    this.comfortKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    this.comfortKey.on('down', () => {
      this.changeColor(10)
    })

    const TimerEventConfig = {
      delay: 1000,
      loop: true,
      callback: this.randomColorChange,
      callbackScope: this
    }
    
    this.scene.time.addEvent(TimerEventConfig)

    this.scene.add.existing(this)
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
    this.color = new Phaser.Display.Color(red + amount, green, Math.max(0, blue - amount))
  }
}


/** 
Math notes:

total is always 255, so use a percentage
*/