import { createAnimations } from "./animation.js"

/**
 * global Phaser
 */
const config = {    
    type: Phaser.AUTO, //webgl, canvas, headless 
    width: 256,
    height:244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload, //carga de recursos
        create: create, //se ejecuta una vez al inicio
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

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')

   this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png')
}


function create(){
    //image(x,y, id-del assets)
    this.add.image(100, 50, 'cloud1')
    .setOrigin(0.0) //cambia el origen de la imagen
    .setScale(0.15) //escala la imagen

    this.floor = this.physics.add.staticGroup()

    this.floor
    .create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()

    
    this.floor
    .create(150, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()

 
    this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)//colisiona con los limites del mundo
    .setGravityY(300)//gravedad del personaje

    this.physics.world.setBounds(0, 0, 2000, config.height)
  this.physics.add.collider(this.mario, this.floor)

  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    this.keys = this.input.keyboard.createCursorKeys()
}

function update(){
if(this.mario.isDead) return

 if (this.keys.left.isDown){
    this.mario.anims.play('mario-walk', true)
     this.mario.x -= 2
    this.mario.flipX = true
 }else if (this.keys.right.isDown){
    this.mario.anims.play('mario-walk', true)
    this.mario.x += 2 
    this.mario.flipX = false 
 } else{
       this.mario.anims.play('mario-Idle', true)
 }

 if (this.keys.up.isDown && this.mario.body.touching.down){
    this.mario.setVelocityY(-300)
    this.mario.anims.play('mario-jump', true)
}

if (this.mario.y >= config.height){
   this.mario.anims.play('mario-die')
   this.mario.setCollideWorldBounds(false)
   this.sound.play('gameover')


   setTimeout(() => {
      this.mario.setVelocityY(-350)
   }, 100)

   setTimeout(() => {
      this.scene.restart()
   }, 2000)
}
}