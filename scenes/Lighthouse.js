import { setupMovement } from '../world/playerMovement.js';
import { preloadAvatar, createAvatar } from '../world/avatar.js';
import { createRoomTransitionUI } from '../world/roomTransition.js';
import { createMenu, preloadMenu } from '../world/UIManager.js';
import { performIdles } from '../world/animations.js';

export class Lighthouse extends Phaser.Scene {
    constructor() {
        super({ key: 'Lighthouse' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 300;
        this.playerYLocation = data.playerYLocation || 400; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);
        preloadAvatar(this); // Preload the player's avatar
    }

    async create() {
        const bg = this.add.image(0, 0, 'lighthouse').setOrigin(0, 0);
        bg.setScrollFactor(1); // Make sure it scrolls with the camera

        this.cameras.main.setBounds(0, 0, bg.width, this.scale.height);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);
        this.cameras.main.startFollow(this.player);

        // Create Room Transitions
        createRoomTransitionUI(this, this.player, 'LighthouseInside', '', 582, 261, 141, 147, "Go inside the\nLighthouse");
        createRoomTransitionUI(this, this.player, 'Carnival', 'Carnival', 1364, 94, 423, 188);

        createMenu(this, this.player);

        this.updateMovement = setupMovement(this, this.player, 200);

        this.beach_music = this.sound.add('beach_music', { loop: true, volume: 0.5 });
        this.beach_music.play();
    }

    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }
    
}

export class LighthouseInside extends Phaser.Scene {
    constructor() {
        super({ key: 'LighthouseInside' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 218;
        this.playerYLocation = data.playerYLocation || 387; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'lighthouse_inside').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        createRoomTransitionUI(this, this.player, 'Lighthouse', '', 76, 188, 126, 148, "Go outside");
        createRoomTransitionUI(this, this.player, 'LighthouseRoof', '', 257, 53, 120, 106, "Go up");

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

export class LighthouseRoof extends Phaser.Scene {
    constructor() {
        super({ key: 'LighthouseRoof' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 508;
        this.playerYLocation = data.playerYLocation || 310; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        preloadMenu(this);
        preloadAvatar(this); // Preload the player's avatar
    }

    async create() {
        const bg = this.add.image(0, 0, 'lighthouse_roof').setOrigin(0, 0);
        bg.setScrollFactor(1); // Make sure it scrolls with the camera

        this.cameras.main.setBounds(0, 0, bg.width, this.scale.height);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);
        this.cameras.main.startFollow(this.player);

        // Create Room Transitions
        createRoomTransitionUI(this, this.player, 'LighthouseInside', '', 367, 323, 128, 91, "Go down");

        createMenu(this, this.player);

        this.updateMovement = setupMovement(this, this.player, 200);
    }

    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }
    
}