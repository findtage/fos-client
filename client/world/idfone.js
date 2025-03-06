import { getPlayerAvatarData } from "../game.js"

export function openIdfone(scene, idFoneData){
    if (idFoneData.username == getPlayerAvatarData().username){
        console.log("Opening my own idFone")
    } else {
        console.log("Opening", idFoneData.username + "'s idFone")
    }

    const screen_tint = scene.add.rectangle(0, 0, 800, 520).setOrigin(0, 0).setScrollFactor(0).setDepth(2).setInteractive();
		screen_tint.isFilled = true;
		screen_tint.fillColor = 0;
		screen_tint.fillAlpha = 0.4;
		screen_tint.strokeColor = 11184810;

    screen_tint.on('pointerup', (pointer, localX, localY, event) => {
        event.stopPropagation();
    });
};