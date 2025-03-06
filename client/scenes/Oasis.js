import { setupMovement } from '../world/playerMovement.js';
import { preloadAvatar, createAvatar } from '../world/avatar.js';
import { createRoomTransitionUI } from '../world/roomTransition.js';
import { createMenu, preloadMenu } from '../world/UIManager.js';
import { performIdles } from '../world/animations.js';

export class Oasis extends Phaser.Scene {
    constructor() {
        super({ key: 'Oasis' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 900;
        this.playerYLocation = data.playerYLocation || 335; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this)
        preloadAvatar(this); // Preload the player's avatar
    }

    async create() {
        const bg = this.add.image(0, 0, 'oasis').setOrigin(0, 0);
        bg.setScrollFactor(1); // Make sure it scrolls with the camera

        this.cameras.main.setBounds(0, 0, bg.width, this.scale.height);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);
        this.cameras.main.startFollow(this.player);


        // Create Room Transitions
        createRoomTransitionUI(this, this.player, 'Dock', '', 1371, 384, 360, 224, 'Go to the Dock');

        createMenu(this, this.player);

        this.updateMovement = setupMovement(this, this.player, 200);   
    }

    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }
}

export class Dock extends Phaser.Scene {
    constructor() {
        super({ key: 'Dock' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 404;
        this.playerYLocation = data.playerYLocation || 259; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'dock').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);;

        createRoomTransitionUI(this, this.player, 'Downtown', 'Downtown', 378, 124, 204, 122);

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}