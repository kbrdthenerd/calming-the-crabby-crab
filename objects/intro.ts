import { GameObjects } from 'phaser'

export class Intro extends GameObjects.Group {

  constructor(params) {
    const { scene } = params
    super(scene)
    const titleText = new GameObjects.Text(scene, 50, 50, 'Comfort the Crab',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff', fontSize: '30px'
    })
    const descriptionText =  new GameObjects.Text(scene, 120, 100, 'Press space to comfort',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    this.addMultiple([titleText, descriptionText], true)
  }

  fade() {
    this.children.iterate( text => {
      this.scene.tweens.add({
        targets: text,
        alpha: 0,
        duration: 1000,
      })
    })
  }
}