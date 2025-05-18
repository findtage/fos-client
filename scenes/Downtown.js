import { setupMovement } from '../world/playerMovement.js';
import { preloadAvatar, createAvatar} from '../world/avatar.js';
import { createRoomTransitionUI } from '../world/roomTransition.js';
import { createMenu, preloadMenu } from '../world/UIManager.js';
import { createAvatarAnimations, performIdles } from '../world/animations.js';
import { getPlayerAvatarData } from '../game.js';

export class Downtown extends Phaser.Scene {
    constructor() {
        super({ key: 'Downtown' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 800;
        this.playerYLocation = data.playerYLocation || 460; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);

        const avatarData = getPlayerAvatarData();

        if (!avatarData) {
            console.error("❌ No avatar data found!");
            return;
        }
        preloadAvatar(this); // Preload the player's avatar
    }

    async create() {
        const bg = this.add.image(0, 0, 'downtown').setOrigin(0, 0);
        bg.setScrollFactor(1); // Make sure it scrolls with the camera

        this.cameras.main.setBounds(0, 0, bg.width, this.scale.height);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        createAvatarAnimations(this, this.player);
        performIdles(this.player);

        this.cameras.main.startFollow(this.player);

        // Create Room Transitions X,Y and Width, Height
        createTransUIDT(this, this.player, 'School', 'Fantage School', 2295, 345, 75, 90);
        createTransUIDT(this, this.player, 'StarCafe', 'Star Cafe', 460, 262, 128, 128, "Enter the "); //Enter the Star Cafe
        //createRoomTransitionUI(this, this.player, 'QBlast', 'Q-Blast', 368, 247, 82, 123); Go to Gizmo's Q-Blast 177, 199
        createTransUIDT(this, this.player, 'Beach', 'Beach', 91, 240, 128, 128, "Go to the ");
        createTransUIDT(this, this.player, 'Uptown', 'Uptown', 897, 209, 128, 128);
        createTransUIDT(this, this.player, 'Leshop', 'Le Shop', 1232, 254, 128, 128);
        createTransUIDT(this, this.player, 'Salon', 'Stellar Salon', 1594, 281, 128, 128);
        createTransUIDT(this, this.player, 'MissionCenter', 'Mission Center', 1761, 360, 100, 50);
        createTransUIDT(this, this.player, 'TopModel', 'Top Models', 1958, 286, 128, 128);

        createMenu(this, this.player);

        this.updateMovement = setupMovement(this, this.player, 200);

        this.downtown_music = this.sound.add('downtown_music', { loop: true, volume: 0.5 });
        this.downtown_music.play();
    }

    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

function createTransUIDT(scene, player, targetScene, roomName, x, y, width, height, entranceMessage = "Go to ") {
    const container = scene.add.ellipse(x, y, width, height, 0xaaaaaa).setInteractive();
    container.setOrigin(0.5, 1);
    container.setFillStyle(0xaaaaaa, 0);

    const popupBg = scene.add.graphics();
    popupBg.setVisible(false);
    popupBg.setScrollFactor(1); // Optional: same as above


    const popup = scene.add.text(x, y - 75, `${entranceMessage}${roomName}`, {
        fontSize: '12.5px',
        color: '#000000',
        backgroundColor: null,
        fontFamily: 'Verdana',
        padding: { left: 5, right: 5, top: 2, bottom: 2 },
    }).setOrigin(0.5).setVisible(false);

    popup.setAlign('center');
    popup.setScrollFactor(1); // Optional: keeps it fixed to screen, but can be removed if you want it to scroll

    // Show popup on hover
    container.on('pointerover', () => {
        popup.setVisible(true);
        popupBg.setVisible(true);
    });

    container.on('pointerout', () => {
        popup.setVisible(false);
        popupBg.setVisible(false);
    });

    // Move popup with cursor, accounting for camera scroll
    container.on('pointermove', (pointer) => {
        const worldPoint = scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
        const padding = 4;

        popup.setPosition(worldPoint.x, worldPoint.y - 20);

        const textBounds = popup.getBounds();

        popupBg.clear();
        popupBg.fillStyle(0xFFFDCD, 1);
        popupBg.lineStyle(0.5, 0x000000, 1);
        popupBg.fillRect(
            textBounds.x - padding,
            textBounds.y - padding,
            textBounds.width + 2 * padding,
            textBounds.height + 2 * padding
        );
        popupBg.strokeRect(
            textBounds.x - padding,
            textBounds.y - padding,
            textBounds.width + 2 * padding,
            textBounds.height + 2 * padding
        );
    });

    let isTransitioning = false;

    container.on('pointerup', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        player.targetX = x;
        player.targetY = y;

        const checkArrival = scene.time.addEvent({
            loop: true,
            delay: 50,
            callback: () => {
                if (Phaser.Math.Distance.Between(player.x, player.y, x, y) <= 30) {
                    checkArrival.remove(false);
                    console.log(`Transitioning to scene: ${targetScene}`);
                    scene.scene.start(targetScene);
                }
            },
        });
    });
}

// Enter the Star Cafe
export class StarCafe extends Phaser.Scene {
    constructor() {
        super({ key: 'StarCafe' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 281;
        this.playerYLocation = data.playerYLocation || 345; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'starcafe').setOrigin(0, 0);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        createRoomTransitionUI(this, this.player, 'Downtown', 'Downtown', 629, 159, 93, 151);

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);

        this.star_cafe_music = this.sound.add('star_cafe_music', { loop: true, volume: 0.5 });
        this.star_cafe_music.play();
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

// Go to Le Shop
export class LeShop extends Phaser.Scene {
    constructor() {
        super({ key: 'Leshop' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 370;
        this.playerYLocation = data.playerYLocation || 432; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'leshop').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        createRoomTransitionUI(this, this.player, 'Downtown', 'Downtown', 378, 227, 91, 131);

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

//Visit the Stellar Salon
export class Salon extends Phaser.Scene {
    constructor() {
        super({ key: 'Salon' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 352;
        this.playerYLocation = data.playerYLocation || 310; 
        this.playerDirection = data.playerDirection || 'left';
    }

    preload() {
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'salon').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        createRoomTransitionUI(this, this.player, 'Downtown', 'Downtown', 378, 186, 95, 153);

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

export class TopModel extends Phaser.Scene {
    constructor() {
        super({ key: 'TopModel' });
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);
        preloadAvatar(this);
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 420;
        this.playerYLocation = data.playerYLocation || 434; 
        this.playerDirection = data.playerDirection || 'left';
    }

    async create() {
        this.add.image(0, 0, 'topmodel').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        createRoomTransitionUI(this, this.player, 'Downtown', 'Downtown', 214, 181, 123, 186);
        createRoomTransitionUI(this, this.player, 'TopModelVIP', 'V.I.P Lounge', 488, 147, 155, 193);

        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);

        this.top_models_music = this.sound.add('top_models_music', { loop: true, volume: 0.5 });
        this.top_models_music.play();
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}

export class TopModelVIP extends Phaser.Scene {
    constructor() {
        super({ key: 'TopModelVIP' });
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this)
        preloadAvatar(this); // Preload the player's avatar
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 1071;
        this.playerYLocation = data.playerYLocation || 255; 
        this.playerDirection = data.playerDirection || 'left';
    }

    async create() {
        const bg = this.add.image(0, 0, 'topmodelvip').setOrigin(0, 0);
        bg.setScrollFactor(1); // Make sure it scrolls with the camera

        this.cameras.main.setBounds(0, 0, bg.width, this.scale.height);

        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);
        this.cameras.main.startFollow(this.player);

        // Create Room Transitions X,Y and Width, Height
        createRoomTransitionUI(this, this.player, 'TopModel', 'Lobby', 1164, 196, 127, 220);

        createMenu(this, this.player);

        this.updateMovement = setupMovement(this, this.player, 200);

        this.vip_room_music = this.sound.add('vip_room_music', { loop: true, volume: 0.5 });
        this.vip_room_music.play();
    }

    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }
    
}