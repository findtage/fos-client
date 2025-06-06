import { Downtown, LeShop, Salon, StarCafe, TopModel, TopModelVIP } from './scenes/Downtown.js';
import { BoardShop, Botique, CostumeShop, FurnitureShop, IDfoneShop, MissionCenter, MyMall, Uptown } from './scenes/Uptown.js';
import { CreatureArea, CreatureShop, Forest, Grotto, GrottoSecretOne, GrottoSecretTwo, Wizard } from './scenes/Forest.js';
import { Beach, DanceClub, TanStore } from './scenes/Beach.js';
import { Restaurant, Ship } from './scenes/Ship.js';
import { Cabin, Mountain } from './scenes/Mountain.js';
import { Lighthouse, LighthouseInside, LighthouseRoof } from './scenes/Lighthouse.js';
import { Castle, CastleInside, CastleYard } from './scenes/Castle.js';
import { Arcade, Carnival } from './scenes/Carnival.js';
import { PetClass, PetSchool, PetShop, PetTown } from './scenes/PetTown.js';
import { Island, IslandStore, Resort, Spa } from './scenes/Island.js';
import { Dock, Oasis } from './scenes/Oasis.js';
import { Cafeteria, EnglishRoom, Gym, MathRoom, School, SchoolInside, SchoolUpstairs } from './scenes/School.js';
import { Preloader } from './scenes/Preloader.js';
import { Home } from './scenes/Home.js';

import { MouseOut } from './minigames/mouseOut.js';
import { TypeBoo } from './minigames/typeBoo.js';
import { RuffleScene } from './minigames/ruffleGame.js';

const params = new URLSearchParams(window.location.search);
const username = params.get('username');
const gender = params.get('gender');
console.log(`Username: ${username}, Gender: ${gender}`);
let playerAvatarData = null;

if (gender == 'female'){
    playerAvatarData = {
            username: username,
            board: "board0",
            body: "body0",
            body_acc: "none",
            bottom: "bottom0",
            costume: "none",
            eyes: "eyes0",
            face_acc: "none",
            gender: "female",
            hair: "hair0",
            hair_acc: "none",
            head: "head0",
            home: "home0",
            idfone: { level: 0 },
            outfit: "none",
            shoes: "shoe0",
            stars: 2500,
            top: "top0"
    }
} 
else {
        playerAvatarData = {
            username: username,
            board: "board0",
            body: "mbody0",
            body_acc: "none",
            bottom: "mbottom0",
            costume: "none",
            eyes: "meyes0",
            face_acc: "none",
            gender: "male",
            hair: "mhair0",
            hair_acc: "none",
            head: "mhead0",
            home: "home0",
            idfone: { level: 0 },
            outfit: "none",
            shoes: "mshoe0",
            stars: 2500,
            top: "mtop0"
        }
}

console.log(playerAvatarData);

export function updateLocalAvatarData(newData) {
    if (playerAvatarData) {
        Object.assign(playerAvatarData, newData); // ✅ Update the in-memory avatar data
    }
}

export function getPlayerAvatarData() {
    return playerAvatarData;
}

//export const username = userData.username;//getUsernameFromURL();

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 520,
    "transparent": true,
    antialias: false,
    // All scenes
    scene: [
        Preloader, // Load every asset here
        Downtown, StarCafe, LeShop, Salon, TopModel, TopModelVIP, MissionCenter,
        Uptown, FurnitureShop, MyMall, IDfoneShop, CostumeShop, BoardShop, Botique,
        Carnival, Arcade,
        PetTown, PetShop, PetClass, PetSchool,
        Forest, Wizard, Grotto, GrottoSecretOne, GrottoSecretTwo, CreatureArea, CreatureShop,
        School, SchoolInside, SchoolUpstairs, MathRoom, EnglishRoom, Cafeteria, Gym,
        Beach, TanStore, DanceClub,
        Ship, Restaurant,
        Mountain, Cabin,
        Lighthouse, LighthouseInside, LighthouseRoof,
        Castle, CastleInside, CastleYard,
        Island, Spa, Resort, IslandStore,
        Oasis, Dock,
        MouseOut, TypeBoo,
        Home,
        RuffleScene
    ],
};

const game = new Phaser.Game(config);

const canvas = game.canvas;
const ctx = canvas.getContext('2d', { willReadFrequently: true });