import { GameObjects } from 'phaser'

export class Comforts extends GameObjects.Group {
  private texts: string[]

  constructor(params) {
    const { scene } = params
    super(scene)
    this.texts = ['It\'ll be ok', 'I\'m here if you need me']
  }

  addComfort() {
    const { floor, random } = Math
    const x = floor(random() * 600)
    const y = floor(random() * 500)
    const textIndex = floor(random() * this.texts.length)
    const text = new GameObjects.Text(this.scene, x, y, this.texts[textIndex],{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    this.add(text, true)
    this.scene.tweens.add({
      targets: text,
      alpha: 0,
      duration: 1000,
    })
  }
}