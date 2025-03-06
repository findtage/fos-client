import { assets } from "../assets/data.js";

export function createAvatarAnimations(scene, player) {
    // Function to create animations dynamically per player
    function createAnimation(key, texture, frames, frameRate = 2.5) {
        const animationKey = `${key}-${texture}`;

        if (!scene.anims.exists(animationKey)) { // Prevent duplicate animations
            scene.anims.create({
                key: animationKey,
                frames: scene.anims.generateFrameNumbers(texture, { frames: frames }),
                frameRate: frameRate,
                repeat: 0,
            });
        }
    }

    if (assets['hair']?.["female"]?.[player.hair.texture.key]?.["type"] == "sprite"){
        const hairanimationKey = `idle-${player.hair.texture.key}`;

        if (!scene.anims.exists(hairanimationKey)) { // Prevent duplicate animations
            scene.anims.create({
                key: hairanimationKey,
                frames: scene.anims.generateFrameNumbers(player.hair.texture.key, { frames: [0, 1, 2, 3] }),
                frameRate: 2.5,
                repeat: -1,
            });
        }
    }  

    // Get unique asset names for this player
    const bodyTexture = player.base.texture.key;
    const topTexture = player.top.texture.key;
    const bottomTexture = player.bottom.texture.key;
    const shoeTexture = player.shoes.texture.key;
    const eyesTexture = player.eyes.texture.key;
    const browsTexture = player.brows.texture.key;
    const lipsTexture = player.lips.texture.key;

    // Define animations for this player only
    createAnimation("wave", bodyTexture, [1, 2, 1, 2, 1, 0]);
    createAnimation("wave", topTexture, [1, 2, 1, 2, 1, 0]);
    createAnimation("wave", lipsTexture, [1, 1, 1, 1, 1, 0]);

    createAnimation("jump", bodyTexture, [0, 5, 0, 5, 0]);
    createAnimation("jump", topTexture, [0, 5, 0, 5, 0]);
    createAnimation("jump", bottomTexture, [0, 1, 0, 1, 0]);
    createAnimation("jump", shoeTexture, [0, 1, 0, 1, 0]);
    createAnimation("jump", lipsTexture, [0, 1, 1, 1, 0]);

    createAnimation("cry", bodyTexture, [3, 4, 3, 4, 3, 4, 0]);
    createAnimation("cry", topTexture, [3, 4, 3, 4, 3, 4, 0]);
    createAnimation("cry", browsTexture, [1, 1, 1, 1, 1, 1, 0]);
    createAnimation("cry", eyesTexture, [1, 1, 1, 1, 1, 1, 0]);

    createAnimation("wink", eyesTexture, [1, 0, 1, 0, 2, 0]);
    createAnimation("wink", lipsTexture, [0, 0, 0, 0, 1, 0]);
}

let emotePopup = null;
let actionButtons = null;
export function toggleEmotePopup(scene, player) {
    if (emotePopup) {
        emotePopup.destroy(); // Hide the popup if it exists
        emotePopup = null;
        if (actionButtons != null){
            actionButtons.forEach((button) => button.destroy());
        }

           
    } else {
        // Create the popup image
        emotePopup = scene.add.image(257, 376, 'actionmenu').setOrigin(0.5, 0.5).setScrollFactor(0);
        emotePopup.setDepth(2); // Ensure it's above other UI elements

        const buttonConfigs = [
            { name: 'wave', x: 238, y: 301, width: 30, height: 30 },
            { name: 'cry', x: 276, y: 301, width: 30, height: 30},
            { name: 'jump', x: 238, y: 339, width: 30, height: 30 },
            { name: 'wink', x: 277, y: 339, width: 30, height: 30 },
            //{ name: 'blush', x: 13, y: 9, width: 30, height: 30 },
            //{ name: 'surprised', x: 13, y: 9, width: 30, height: 30 },
            //{ name: 'laugh', x: 13, y: 9, width: 30, height: 30 },
            //{ name: 'embarassed', x: 13, y: 9, width: 30, height: 30 },
            //{ name: 'inLove', x: 13, y: 9, width: 30, height: 30 },
            //{ name: 'kawaii', x: 13, y: 9, width: 30, height: 30 }
        ];

        actionButtons = buttonConfigs.map(({ name, x, y, width, height }) => {
        
            const button = scene.add
            .rectangle(x, y, width, height, 0xffffff, 0) // Invisible interactive rectangle
            .setInteractive()
            .setScrollFactor(0); // Fix to the camera view
        
            button.setDepth(2)
        
            // Add pointerdown event
            button.on('pointerdown', (pointer, x, y, event) => {
            console.log(`You clicked on ${name}`);
            //event.stopPropagation(); // Prevent clicks from propagating
            });
        
            button.on('pointerup', (pointer, localX, localY, event) => {
                if (name == "wave"){
                    event.stopPropagation();
                    performWave(player)
                    emotePopup.destroy();
                    emotePopup = null;
                    actionButtons.forEach((button) => button.destroy());
                } else if (name == "jump"){
                    event.stopPropagation();
                    performJump(player)
                    emotePopup.destroy();
                    emotePopup = null;
                    actionButtons.forEach((button) => button.destroy());
                } else if (name == "cry"){
                    event.stopPropagation();
                    performCry(player)
                    emotePopup.destroy();
                    emotePopup = null;
                    actionButtons.forEach((button) => button.destroy());
                } else if (name == "wink"){
                    event.stopPropagation();
                    performWink(player)
                    emotePopup.destroy();
                    emotePopup = null;
                    actionButtons.forEach((button) => button.destroy());
                }
            });
            // Optional hover effect
            button.on('pointerover', () => {
                button.setFillStyle(0x2D2D2D, 0.3); // Add slight highlight on hover
            });
            button.on('pointerout', () => {
                button.setFillStyle(0xffffff, 0); // Remove highlight
            });
        
            return button;
        });

        // Close popup when clicking outside
        scene.input.once('pointerup', () => {
            if (emotePopup) {
                emotePopup.destroy();
                emotePopup = null;
                if (actionButtons != null && actionButtons){
                    actionButtons.forEach((button) => button.destroy());
                }
                console.log("Closing popup and destroying buttons");
            }
        });
  }
}

export function performWave(player){
    player.base.play(`wave-${player.base.texture.key}`);
    player.lips.play(`wave-${player.lips.texture.key}`);
    player.top.play(`wave-${player.top.texture.key}`);
}

export function performJump(player) {
    let jumped = [false, false, false, false];
    player.isJumping = true;
    
    player.base.play(`jump-${player.base.texture.key}`);

    player.base.on('animationupdate', (anim, frame) => {
        if (anim.key === `jump-${player.base.texture.key}`) {
            if (frame.index === 2 || frame.index === 4) {
                if (!jumped[frame.index + 2]) {
                    player.y -= 5;
                    jumped[frame.index + 2] = true;
                }
            } else if (frame.index === 3 || frame.index === 5) {
                if (!jumped[frame.index + 2]) {
                    player.y += 5;
                    jumped[frame.index + 2] = true;
                }
            }
        }
    });

    player.lips.play(`jump-${player.lips.texture.key}`);
    player.top.play(`jump-${player.top.texture.key}`);
    player.bottom.play(`jump-${player.bottom.texture.key}`);
    player.shoes.play(`jump-${player.shoes.texture.key}`);

    player.base.once('animationcomplete', () => {
        player.isJumping = false; // Re-enable movement when jump animation finishes
    });
}

export function performCry(player) {
    player.base.play(`cry-${player.base.texture.key}`);
    player.top.play(`cry-${player.top.texture.key}`);
    player.brows.play(`cry-${player.brows.texture.key}`);
    player.eyes.play(`cry-${player.eyes.texture.key}`);

    let bopped = [false, false, false, false, false, false];
    player.isCrying = true;

    player.base.on('animationupdate', (anim, frame) => {
        if (anim.key === `cry-${player.base.texture.key}`) {
            if (frame.index === 2 || frame.index === 4 || frame.index === 6) {
                if (!bopped[frame.index + 2]) {
                    player.head.y += 1;
                    player.hair.y += 1;
                    player.brows.y += 1;
                    player.eyes.y += 1;

                    player.head.x -= 1;
                    player.hair.x -= 1;
                    player.brows.x -= 1;
                    player.eyes.x -= 1;

                    bopped[frame.index + 2] = true;
                }
            } else if (frame.index === 3 || frame.index === 5 || frame.index === 7) {
                if (!bopped[frame.index + 2]) {
                    player.head.y -= 1;
                    player.hair.y -= 1;
                    player.brows.y -= 1;
                    player.eyes.y -= 1;

                    player.head.x += 1;
                    player.hair.x += 1;
                    player.brows.x += 1;
                    player.eyes.x += 1;

                    bopped[frame.index + 2] = true;
                }
            }
        }
    });

    player.base.once('animationcomplete', () => {
        player.isCrying = false; // Re-enable movement when cry animation finishes
    });
}

export function performWink(player) {
    player.lips.play(`wink-${player.lips.texture.key}`);
    player.eyes.play(`wink-${player.eyes.texture.key}`);
}

export function performIdles(player) {
    if (assets['hair']?.["female"]?.[player.hair.texture.key]?.["type"] == "sprite"){
        player.hair.play(`idle-${player.hair.texture.key}`);
    }
}
