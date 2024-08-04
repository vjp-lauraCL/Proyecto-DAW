/**
 * global Phaser
 */
const config = {    
    type: Phaser.AUTO, //webgl, canvas, headless 
    width: 256,
    height:244,
    backgroundColor: '#049cd8',
    parent: 'game',
    scene: {
        preload: preload, //carga de recursos
        create: create, //se eejecuta una vez al inicio
        update: update
    }
}

new Phaser.Game(config)

function preload(){
   //this hace referencia al juego que construimos
   this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png')
    //carga de spritesheet
   this.load.spritesheet('mario', 'assets/entities/mario.png',
    {frameWidth: 18, frameHeight: 16})


   this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png')
}

function create(){
    //image(x,y, id-del assets)
    this.add.image(100, 50, 'cloud1')
    .setOrigin(0.0) //cambia el origen de la imagen
    .setScale(0.15) //escala la imagen

    this.add.tileSprite(0, config.height -32, config.width, 32, 'floorbricks')
    .setOrigin(0, 0)

   this.mario = this.add.sprite(50, 210, 'mario')
    .setOrigin(0, 1)
   
    this.anims.create({
        key:'mario-walk',
        frames:this.anims.generateFrameNumbers(
            'mario', 
            {start: 3, end: 1}
        ),
        repeat: -1

    })


    this.keys = this.input.keyboard.createCursorKeys()
}

function update(){
 if (this.keys.left.isDown){
     this.mario.x -= 2
     this.mario.anims.play('mario-walk', true)
 }else if (this.keys.right.isDown){
    this.mario.anims.play('mario-walk', true)
    this.mario.x += 2  
 } else{
        this.mario.anims.stop()
        this.mario.setFrame(0)
 }
}   