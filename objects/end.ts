import { GameObjects } from 'phaser'

export class End extends GameObjects.Group {

  constructor(params) {
    const { scene, won } = params
    super(scene)
    const resultCopy = (won && 'The Crab was comforted')  || 'The Crab could not be comforted'
    const resultText = new GameObjects.Text(scene, 50, 50, resultCopy,{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff', fontSize: '30px'
    })
    const tryAgainText =  new GameObjects.Text(scene, 50, 100, 'Press enter to play again',{ 
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#ffffff' 
    })
    this.addMultiple([resultText, tryAgainText], true)
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