import { setupMovement } from '../world/playerMovement.js';
import { preloadAvatar, createAvatar} from '../world/avatar.js';
import { createMenu, preloadMenu } from '../world/UIManager.js';
import { performIdles } from '../world/animations.js';
import { getPlayerAvatarData } from '../game.js';


export class Home extends Phaser.Scene {
    constructor() {
        super({ key: 'Home' });
    }

    init(data) {
        this.playerXLocation = data.playerXLocation || 400;
        this.playerYLocation = data.playerYLocation || 450; 
        this.playerDirection = data.playerDirection || 'left';
        this.playerHomeID = data.playerHomeID || getPlayerAvatarData().username;
    }

    preload() {
        this.sound.stopAll(); 
        preloadMenu(this);
        preloadAvatar(this);
    }

    async create() {
        this.add.image(0, 0, 'default_home1').setOrigin(0, 0);
        
        this.player = createAvatar(this, this.playerXLocation, this.playerYLocation, this.playerDirection);
        performIdles(this.player);

        console.log(getPlayerAvatarData().username, "is joining", this.playerHomeID+"'s home");
        createMenu(this, this.player);
        
        this.updateMovement = setupMovement(this, this.player, 200);
    }
    
    update(time, delta) {
        if (this.updateMovement) this.updateMovement(delta);
    }

}