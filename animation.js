export const createAnimations = (game) => {
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers('mario', {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    })
    game.anims.create({
        key: 'mario-jump',
        frames: [{key: 'mario', frame: 3}],
        frameRate: 10
    })
    game.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 4}],
        frameRate: 10
    })

    game.anims.create({
        key: 'mario-die',
        frames: [{key: 'mario', frame: 4}],
      
    })
}