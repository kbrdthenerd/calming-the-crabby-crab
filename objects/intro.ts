import { GameObjects } from 'phaser'

export class Intro extends GameObjects.Group {

  constructor(params) {
    const { scene } = params
    super(scene)
    const titleText = new GameObjects.Text(scene, 50, 50, 'Comfort the Crab',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff', fontSize: '30px'
    })
    const descriptionText =  new GameObjects.Text(scene, 50, 100, 'Press space to comfort',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    const myCredit =  new GameObjects.Text(scene, 20, 560, 'Design & Programming by Katherine Brennan',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    const lisaCredit =  new GameObjects.Text(scene, 20, 540, 'Art by Lisa Luebbert',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    this.addMultiple([titleText, descriptionText, myCredit, lisaCredit], true)
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