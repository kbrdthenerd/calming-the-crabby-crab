/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Flappy Bird: Bird
 * @license      Digitsensitive
 */

export class Crab extends Phaser.GameObjects.Image {
  private comfortKey: Phaser.Input.Keyboard.Key
  private color: Phaser.Display.Color

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame)
    this.color = new Phaser.Display.Color(120, 0, 120)
    this.comfortKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
    this.comfortKey.on('down', () => {
      this.color = new Phaser.Display.Color(this.color.red + 10, this.color.green, this.color.blue)
    })

    this.scene.add.existing(this)
  }

  update(): void {
    this.tint = this.color.color
  }
}
