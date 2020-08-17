import { GameObjects, Input, Display, Game,  } from 'phaser'

export class Comforts extends GameObjects.Group {
  private texts: string[]

  constructor(params) {
    const { scene, x, y, key, frame } = params
    super(scene)
    this.texts = ['It\'ll be ok', 'I\'m here if you need me']
  }

  addComfort() {
    const x = Math.floor(Math.random() * 600)
    const y = Math.floor(Math.random() * 500)
    const textIndex = Math.floor(Math.random() * this.texts.length)
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