import { assets, tops, body, heads, avatar_parts, bottoms, outfits, shoes, boards, homes, face_acc, body_acc } from '../assets/data.js';

export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        // Load the custom background image for the loading screen
        this.load.image("loading_bg", "assets/ui/fos_loading_screen.png");
        
        this.load.once("complete", () => {
            console.log("Background loaded. Displaying background and loading other assets...");
            this.showLoadingScreen();
        });

        // Start loading
        this.load.start();
    }

    showLoadingScreen() {
        // Display the custom loading background
        this.add.image(0, 0, "loading_bg").setOrigin(0);

        this.loadingText = this.add.text(400, 500, "Loading... 0%", {
            fontSize: "32px",
            fill: "#ffffff",
        }).setOrigin(0.5);

        // Now load all other assets
        this.loadAssets();

        // Show loading progress
        this.load.on("progress", (value) => {
            //console.log(`Loading progress: ${Math.floor(value * 100)}%`);
            this.loadingText.setText(`Loading... ${Math.floor(value * 100)}%`);
        });

        // When all assets are loaded, start the next scene, randomly selects a screen to start with / for now Downtown
        this.load.on("complete", () => {
            //const places = ["Uptown", "Downtown", "Beach", "Forest", "Carnival", "Island", "Oasis"];
            const places = ["Downtown"];
            const random = Math.floor(Math.random() * places.length);
            console.log("All assets loaded. Switching to " + places[random]);
            this.scene.start(places[random]);
        });

        // Start loading all assets
        this.load.start();
    }

    loadAssets() {
        this.loadUIAssets();

        // Load scene assets
        this.loadDowntownAssets();
        this.loadUptownAssets();
        this.loadBeachAssets();
        this.loadForestAssets();
        this.loadIslandAssets();
        this.loadNorthAssets();
        

        // Load all assets for the avatar

        // Parts that don't change
        this.load.image("shadow", avatar_parts.shadow.path);

        this.load.spritesheet("brows", 'assets/'+avatar_parts.female.brows.path, {frameWidth: avatar_parts.female.brows.splitX, frameHeight: avatar_parts.female.brows.splitY});
        this.load.spritesheet("lips", 'assets/'+avatar_parts.female.lips.path, {frameWidth: avatar_parts.female.lips.splitX, frameHeight: avatar_parts.female.lips.splitY});

        this.load.spritesheet("mbrows", 'assets/'+avatar_parts.male.mbrows.path, {frameWidth: avatar_parts.male.mbrows.splitX, frameHeight: avatar_parts.male.mbrows.splitY});
        this.load.spritesheet("mlips", 'assets/'+avatar_parts.male.mlips.path, {frameWidth: avatar_parts.male.mlips.splitX, frameHeight: avatar_parts.male.mlips.splitY});

        //Loading all female hairs from hair0
        let index = 0; // Start numbering from 0
        Object.keys(assets.hair.female).forEach((hairKey) => {
            const hairPath = assets.hair.female[hairKey].path;
            // Load static hairs
            if (assets['hair']?.["female"]?.[hairKey]?.["type"] == "image"){
                this.load.image(`hair${index}`, hairPath);
            // Load animated hairs
            } else  if  (assets['hair']?.["female"]?.[hairKey]?.["type"] == "sprite"){
                this.load.spritesheet(
                    `hair${index}`, 
                    hairPath, 
                    {
                        frameWidth: assets['hair']?.["female"]?.[hairKey]?.["splitX"], 
                        frameHeight: assets['hair']?.["female"]?.[hairKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        //Loading all male hairs from hair0
        index = 0;
        Object.keys(assets.hair.male).forEach((hairKey) => {
            const hairPath = assets.hair.male[hairKey].path;
            // Load static hairs
            if (assets['hair']?.["male"]?.[hairKey]?.["type"] == "image") {
                this.load.image(`mhair${index}`, hairPath);
            // Load animated hairs
            } else if (assets['hair']?.["male"]?.[hairKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mhair${index}`, 
                    hairPath, 
                    {
                        frameWidth: assets['hair']?.["male"]?.[hairKey]?.["splitX"], 
                        frameHeight: assets['hair']?.["male"]?.[hairKey]?.["splitY"]
                    }
                );
            }
            index++;
        });


        //Loading all female tops from top0
        index = 0;
        Object.keys(tops.top.female).forEach((topKey) => {
            const topPath = tops.top.female[topKey].path;
            // Load static tops
            if (tops['top']?.["female"]?.[topKey]?.["type"] == "image"){
                this.load.image(`top${index}`, topPath);
            // Load tops with actions
            } else  if  (tops['top']?.["female"]?.[topKey]?.["type"] == "sprite"){
                this.load.spritesheet(
                    `top${index}`, 
                    topPath,
                    {
                        frameWidth: tops['top']?.["female"]?.[topKey]?.["splitX"], 
                        frameHeight: tops['top']?.["female"]?.[topKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all male tops from top0
        index = 0;
        Object.keys(tops.top.male).forEach((topKey) => {
            const topPath = tops.top.male[topKey].path;
            // Load static tops
            if (tops['top']?.["male"]?.[topKey]?.["type"] == "image") {
                this.load.image(`mtop${index}`, topPath);
            // Load tops with actions
            } else if (tops['top']?.["male"]?.[topKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mtop${index}`, 
                    topPath,
                    {
                        frameWidth: tops['top']?.["male"]?.[topKey]?.["splitX"], 
                        frameHeight: tops['top']?.["male"]?.[topKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all female bottoms
        index = 0;
        Object.keys(bottoms.bottom.female).forEach((bottomKey) => {
            const bottomPath = bottoms.bottom.female[bottomKey].path;
            // Load static bottoms
            if (bottoms['bottom']?.["female"]?.[bottomKey]?.["type"] == "image") {
                this.load.image(`bottom${index}`, bottomPath);
            // Load bottoms with actions
            } else if (bottoms['bottom']?.["female"]?.[bottomKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `bottom${index}`, 
                    bottomPath,
                    {
                        frameWidth: bottoms['bottom']?.["female"]?.[bottomKey]?.["splitX"], 
                        frameHeight: bottoms['bottom']?.["female"]?.[bottomKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all male bottoms
        index = 0;
        Object.keys(bottoms.bottom.male).forEach((bottomKey) => {
            const bottomPath = bottoms.bottom.male[bottomKey].path;
            // Load static bottoms
            if (bottoms['bottom']?.["male"]?.[bottomKey]?.["type"] == "image") {
                this.load.image(`mbottom${index}`, bottomPath);
            // Load bottoms with actions
            } else if (bottoms['bottom']?.["male"]?.[bottomKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mbottom${index}`, 
                    bottomPath,
                    {
                        frameWidth: bottoms['bottom']?.["male"]?.[bottomKey]?.["splitX"], 
                        frameHeight: bottoms['bottom']?.["male"]?.[bottomKey]?.["splitY"]
                    }
                );
            }
            index++;
        });


        // Loading all female outfits
        index = 0;
        Object.keys(outfits.female).forEach((outfitKey) => {
            const outfitPath = outfits.female[outfitKey].path;
            this.load.spritesheet(
                `outfit${index}`, "assets/closet/outfits/female/"+outfitPath,
                    {
                        frameWidth: outfits?.["female"]?.[outfitKey]?.["frameWidth"], 
                        frameHeight: outfits?.["female"]?.[outfitKey]?.["frameHeight"]
                    }
                );
            
            index++;
        });

        // Loading all male outfits
        index = 0;
        Object.keys(outfits.male).forEach((outfitKey) => {
            const outfitPath = outfits.male[outfitKey].path;
            this.load.spritesheet(
                `moutfit${index}`, "assets/closet/outfits/male/" + outfitPath,
                {
                    frameWidth: outfits?.["male"]?.[outfitKey]?.["frameWidth"], 
                    frameHeight: outfits?.["male"]?.[outfitKey]?.["frameHeight"]
                }
            );
            index++;
        });

        // Loading all female shoes
        index = 0;
        Object.keys(shoes.shoe.female).forEach((shoeKey) => {
            const shoePath = shoes.shoe.female[shoeKey].path;
            // Load static shoes
            if (shoes['shoe']?.["female"]?.[shoeKey]?.["type"] == "image") {
                this.load.image(`shoe${index}`, shoePath);
            // Load shoes with actions
            } else if (shoes['shoe']?.["female"]?.[shoeKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `shoe${index}`, 
                    shoePath,
                    {
                        frameWidth: shoes['shoe']?.["female"]?.[shoeKey]?.["splitX"], 
                        frameHeight: shoes['shoe']?.["female"]?.[shoeKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all male shoes
        index = 0;
        Object.keys(shoes.shoe.male).forEach((shoeKey) => {
            const shoePath = shoes.shoe.male[shoeKey].path;
            // Load static shoes
            if (shoes['shoe']?.["male"]?.[shoeKey]?.["type"] == "image") {
                this.load.image(`mshoe${index}`, shoePath);
            // Load shoes with actions
            } else if (shoes['shoe']?.["male"]?.[shoeKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mshoe${index}`, 
                    shoePath,
                    {
                        frameWidth: shoes['shoe']?.["male"]?.[shoeKey]?.["splitX"], 
                        frameHeight: shoes['shoe']?.["male"]?.[shoeKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all female heads
        index = 0;
        Object.keys(heads.head.female).forEach((headKey) => {
            const headPath = heads.head.female[headKey].path;
            // Load static heads
            if (heads['head']?.["female"]?.[headKey]?.["type"] == "image") {
                this.load.image(`head${index}`, 'assets/'+headPath);
            // Load heads with actions
            } else if (heads['head']?.["female"]?.[headKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `head${index}`, 
                    'assets/'+headPath,
                    {
                        frameWidth: heads['head']?.["female"]?.[headKey]?.["splitX"], 
                        frameHeight: heads['head']?.["female"]?.[headKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all male heads
        index = 0;
        Object.keys(heads.head.male).forEach((headKey) => {
            const headPath = heads.head.male[headKey].path;
            // Load static heads
            if (heads['head']?.["male"]?.[headKey]?.["type"] == "image") {
                this.load.image(`mhead${index}`, 'assets/' + headPath);
            // Load heads with actions
            } else if (heads['head']?.["male"]?.[headKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mhead${index}`, 
                    'assets/' + headPath,
                    {
                        frameWidth: heads['head']?.["male"]?.[headKey]?.["splitX"], 
                        frameHeight: heads['head']?.["male"]?.[headKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all female body types
        index = 0;
        Object.keys(body.body.female).forEach((bodyKey) => {
            const bodyPath = body.body.female[bodyKey].path;
            // Load static body images
            if (body['body']?.["female"]?.[bodyKey]?.["type"] == "image") {
                this.load.image(`body${index}`, 'assets/'+bodyPath);
            // Load body spritesheets
            } else if (body['body']?.["female"]?.[bodyKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `body${index}`, 
                    'assets/'+bodyPath,
                    {
                        frameWidth: body['body']?.["female"]?.[bodyKey]?.["splitX"], 
                        frameHeight: body['body']?.["female"]?.[bodyKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all male body types
        index = 0;
        Object.keys(body.body.male).forEach((bodyKey) => {
            const bodyPath = body.body.male[bodyKey].path;
            // Load static body images
            if (body['body']?.["male"]?.[bodyKey]?.["type"] == "image") {
                this.load.image(`mbody${index}`, 'assets/' + bodyPath);
            // Load body spritesheets
            } else if (body['body']?.["male"]?.[bodyKey]?.["type"] == "sprite") {
                this.load.spritesheet(
                    `mbody${index}`, 
                    'assets/' + bodyPath,
                    {
                        frameWidth: body['body']?.["male"]?.[bodyKey]?.["splitX"], 
                        frameHeight: body['body']?.["male"]?.[bodyKey]?.["splitY"]
                    }
                );
            }
            index++;
        });

        // Loading all female eyes
        index = 0;
        Object.keys(avatar_parts.female.eyes).forEach((eyeKey) => {
            const eyePath = avatar_parts.female.eyes[eyeKey].path;
            // Load eyes as sprites
            if (avatar_parts.female.eyes[eyeKey].type === "sprite") {
                this.load.spritesheet(
                    `eyes${index}`, 
                    'assets/'+eyePath,
                    {
                        frameWidth: avatar_parts.female.eyes[eyeKey].splitX, 
                        frameHeight: avatar_parts.female.eyes[eyeKey].splitY
                    }
                );
            } else if (avatar_parts.female.eyes[eyeKey].type === "image") {
                this.load.image(`eyes${index}`, 'assets/'+eyePath);
            }
            index++;
        });

        // Loading all male eyes
        index = 0;
        Object.keys(avatar_parts.male.eyes).forEach((eyeKey) => {
            const eyePath = avatar_parts.male.eyes[eyeKey].path;
            // Load eyes as sprites
            if (avatar_parts.male.eyes[eyeKey].type === "sprite") {
                this.load.spritesheet(
                    `meyes${index}`, 
                    'assets/' + eyePath,
                    {
                        frameWidth: avatar_parts.male.eyes[eyeKey].splitX, 
                        frameHeight: avatar_parts.male.eyes[eyeKey].splitY
                    }
                );
            } else if (avatar_parts.male.eyes[eyeKey].type === "image") {
                this.load.image(`meyes${index}`, 'assets/' + eyePath);
            }
            index++;
        });

        // Loading all boards
        index = 0;
        Object.keys(boards.board).forEach((boardKey) => {
            const boardPath = boards.board[boardKey].path;
            // Load static boards
            if (boards['board']?.[boardKey]?.["type"] == "image") {
                this.load.image(`board${index}`, 'assets/'+boardPath);
            // Load boards with actions
            } /*else if (boards['board']?.[boardKey]?.["type"] == "sprite") {
                console.log("Loading board as sprite");
                this.load.spritesheet(
                    `board${index}`, 
                    'assets/'+boardPath,
                    {
                        frameWidth: boards['board']?.[boardKey]?.["splitX"], 
                        frameHeight: boards['board']?.[boardKey]?.["splitY"]
                    }
                );
            }*/
            
            index++;
        });

        // All homes
        Object.entries(homes).forEach(([key, home]) => {
            const { path, rooms } = home;
            const homeKey = path.split('/').pop();
            
            // Load home icon
            this.load.image(`${homeKey}_home_icon`, `${path}0.png`); // Loaded as default_home_icon
            
            // Load individual room textures
            for (let i = 1; i <= rooms; i++) {
                this.load.image(`${homeKey}_home${i}`, `${path}${i}.png`); // Loaded as default_home1 ... default_home2
            }
        });

        // All female face acc
        index = 0;
        this.load.image('faccEmpty', 'assets/closet/acc/female/face/empty.png');
        Object.keys(face_acc.female).forEach((faceAccKey) => {
            const accPath = face_acc.female[faceAccKey].path;
            // Load static bottoms
            if (face_acc?.["female"]?.[faceAccKey]?.["type"] == "image") {
                this.load.image(`facc${index}`, 'assets/closet/acc/female/face/'+accPath);
            }
            index++;
        });

        // All male face acc
        index = 0;
        Object.keys(face_acc.male).forEach((faceAccKey) => {
            const accPath = face_acc.male[faceAccKey].path;
            // Load static face accessories
            if (face_acc?.["male"]?.[faceAccKey]?.["type"] == "image") {
                this.load.image(`mfacc${index}`, 'assets/closet/acc/male/face/' + accPath);
            }
            index++;
        });

        // Loading all female body acc
        index = 0;
        this.load.image('baccEmpty', 'assets/closet/acc/female/face/empty.png');
        Object.keys(body_acc.female).forEach((bodyAccKey) => {
            const accPath = body_acc.female[bodyAccKey].path;
            this.load.spritesheet(
                `bacc${index}`, "assets/closet/acc/female/body/"+accPath,
                    {
                        frameWidth: body_acc?.["female"]?.[bodyAccKey]?.["splitX"], 
                        frameHeight: body_acc?.["female"]?.[bodyAccKey]?.["splitY"]
                    }
                );
            
            index++;
        });

        // Loading all male body acc
        index = 0;
        this.load.image('baccEmpty', 'assets/closet/acc/male/face/empty.png');
        Object.keys(body_acc.male).forEach((bodyAccKey) => {
            const accPath = body_acc.male[bodyAccKey].path;
            this.load.spritesheet(
                `mbacc${index}`, "assets/closet/acc/male/body/" + accPath,
                {
                    frameWidth: body_acc?.["male"]?.[bodyAccKey]?.["splitX"], 
                    frameHeight: body_acc?.["male"]?.[bodyAccKey]?.["splitY"]
                }
            );
            index++;
        });

    }

    loadUIAssets(){
        // UI Related assets
        this.load.image('shopIcon', '../assets/ui/shop_icon.png');
        this.load.image('idfoneBase', '../assets/ui/idfone_base.png');
        this.load.image('closeButton', '../assets/ui/close_button.png');
        this.load.image('starIcon', '../assets/ui/star.png');
        const font1 = new FontFace('AnimeAce', 'url(assets/fonts/AnimeAce.ttf)');
        const font2 = new FontFace('VAGRounded', 'url(assets/fonts/VAGRounded.ttf)');
        

        this.load.image('castleCatalog0', '../assets/homes/castleCatalogue0.png');
        this.load.image('castleCatalog1', '../assets/homes/castleCatalogue1.png');
        this.load.image('castleCatalog2', '../assets/homes/castleCatalogue2.png');
        this.load.image('castleCatalog3', '../assets/homes/castleCatalogue3.png');

        // Load fonts
        Promise.all([font1.load(), font2.load()]).then((loadedFonts) => {
            loadedFonts.forEach((font) => document.fonts.add(font));
        });
    }

    // Load all Downtown related Assets
    loadDowntownAssets(){
        this.load.image('downtown', '../assets/backgrounds/Downtown/downtown.png');
        this.load.image('starcafe', '../assets/backgrounds/Downtown/star_cafe_winter.png');
        this.load.image('leshop', '../assets/backgrounds/Downtown/leshop_old.png');
        this.load.image('salon', '../assets/backgrounds/Downtown/stellar_salon.png');
        this.load.image('topmodel', '../assets/backgrounds/Downtown/top_models.png');
        this.load.image('topmodelvip', '../assets/backgrounds/Downtown/top_models_vip.png');

        this.load.audio('downtown_music', 'assets/sounds/Downtown/Downtown.mp3');
        this.load.audio('star_cafe_music', 'assets/sounds/Downtown/Star-Cafe.mp3');
        this.load.audio('top_models_music', 'assets/sounds/Downtown/Top-Models-Inc-Fashion-Show-Lobb.mp3');
        this.load.audio('vip_room_music', 'assets/sounds/Downtown/2018-VIP-Room.mp3');
    }

    // Load all Uptown related Assets
    loadUptownAssets(){
        this.load.image('uptown', '../assets/backgrounds/Uptown/uptown_winter.png'); 
        this.load.image('furnitureshop', '../assets/backgrounds/Uptown/ottomans.png');
        this.load.image('mymall', '../assets/backgrounds/Uptown/mymall.png');
        this.load.image('idfoneshop', '../assets/backgrounds/Uptown/idfone_shop_fall.png');
        this.load.image('botique', '../assets/backgrounds/Uptown/botique.png');
        this.load.image('costumeshop', '../assets/backgrounds/Uptown/jesters.png');
        this.load.image('boardshop', '../assets/backgrounds/Uptown/board_shop.png');
        this.load.image('missioncenter', '../assets/backgrounds/Uptown/mission_center.png'); 

        this.load.audio('uptown_music', 'assets/sounds/Uptown/Uptown-2014.mp3');
        this.load.audio('mymall_music', 'assets/sounds/Uptown/MyMall.mp3');
        this.load.audio('idfone_arcade_music', 'assets/sounds/Uptown/Arcade-IDFone-Shop-2010.mp3');
        this.load.audio('botique_music', 'assets/sounds/Uptown/PM-Boutique-Vintage-Gold.mp3');
        this.load.audio('mission_center_music', 'assets/sounds/Uptown/Mission-Center.mp3');
    }

    // Load all Beach / Ship / Lighthouse related Assets
    loadBeachAssets(){
        this.load.image('beach', '../assets/backgrounds/Beach/beach.png');
        this.load.image('danceclub', '../assets/backgrounds/Beach/palm-dance-club.png');
        this.load.image('tanstore', '../assets/backgrounds/Beach/sunblock-1.png');
        this.load.image('ship', '../assets/backgrounds/Ship/ship.png');
        this.load.image('restaurant', '../assets/backgrounds/Ship/restaurant.png');
        this.load.image('lighthouse', '../assets/backgrounds/Lighthouse/light_house.png');
        this.load.image('lighthouse_inside', '../assets/backgrounds/Lighthouse/lighthouse_floor1.png');
        this.load.image('lighthouse_roof', '../assets/backgrounds/Lighthouse/lighthouse_floor2.png');

        this.load.audio('beach_music', 'assets/sounds/Beach/Beach.mp3');
        this.load.audio('ship_music', 'assets/sounds/Beach/Ahoy-Fantage-Sea-Breeze-Cruise.mp3');
        this.load.audio('chez_music', 'assets/sounds/Beach/Chez-Fantage.mp3');
        this.load.audio('sun_block_music', 'assets/sounds/Beach/Sun-Block.mp3');
        this.load.audio('palm_music', 'assets/sounds/Beach/The-Palm.mp3');
    }

    // Load all Forest / School / Creature Area related Assets
    loadForestAssets(){
        this.load.image('forest', '../assets/backgrounds/Forest/forest.png');
        this.load.image('wizard', '../assets/backgrounds/Forest/orions.png');
        this.load.image('grotto', '../assets/backgrounds/Forest/grotto.png');
        this.load.image('grotto_secret_one', '../assets/backgrounds/Forest/secret_forest.png');
        this.load.image('grotto_secret_two', '../assets/backgrounds/Forest/secret_forest_tree.png');
        this.load.image('creaturearea', '../assets/backgrounds/Forest/creature_area_winter.png');
        this.load.image('creatureshop', '../assets/backgrounds/Forest/creature_shop_winter.png');
        this.load.image('school_outside', '../assets/backgrounds/School/fantage_school.png');
        this.load.image('school_inside', '../assets/backgrounds/School/school-2.png');
        this.load.image('mathroom', '../assets/backgrounds/School/school-classroom-1.png');
        this.load.image('englishroom', '../assets/backgrounds/School/school-classroom-2.png');
        this.load.image('school_upstairs', '../assets/backgrounds/School/school-upstairs.png');
        this.load.image('cafeteria', '../assets/backgrounds/School/school-cafeteria.png');
        this.load.image('gym', '../assets/backgrounds/School/school-gym.png');
        
        this.load.audio('forest_music', 'assets/sounds/Forest/Forest.mp3');
        this.load.audio('school_inside_music', 'assets/sounds/Forest/Fantage-School-2012.mp3');
        this.load.audio('school_outside_music', 'assets/sounds/Forest/Fantage-School-Outside.mp3');
        this.load.audio('wizard_music', 'assets/sounds/Forest/Orion-s-Rare-Finds.mp3');
    }

    // Load all Island related Assets
    loadIslandAssets(){
        this.load.image('island', '../assets/backgrounds/Island/island.png');
        this.load.image('spa', '../assets/backgrounds/Island/spa.png');
        this.load.image('resort', '../assets/backgrounds/Island/resort.png');
        this.load.image('islandstore', '../assets/backgrounds/Island/high-tide.png');
        
        this.load.audio('island_music', 'assets/sounds/Island/Island.mp3');
        this.load.audio('spa_music', 'assets/sounds/Island/The-Spa.mp3');
        this.load.audio('resort_music', 'assets/sounds/Island/Island-Resort.mp3');
        this.load.audio('island_store_music', 'assets/sounds/Island/High-Tide.mp3');
    }

    // Load all Carnival / Castle/ Pet Town / Mt Fantage / Oasis related Assets
    loadNorthAssets(){
        this.load.image('carnival', '../assets/backgrounds/Carnival/carnival.png');
        this.load.image('arcade', '../assets/backgrounds/Carnival/arcade.png');
        this.load.image('castle', '../assets/backgrounds/Castle/castle.png');
        this.load.image('castleyard', '../assets/backgrounds/Castle/castle-outside.png');
        this.load.image('castleinside', '../assets/backgrounds/Castle/castle-inside.png');
        this.load.image('mountain', '../assets/backgrounds/Mountain/mountain.png');
        this.load.image('cabin', '../assets/backgrounds/Mountain/cabin.png');
        this.load.image('pet_town', '../assets/backgrounds/Pet Town/pet_town.png');
        this.load.image('petshop', '../assets/backgrounds/Pet Town/pet_shop.png');
        this.load.image('petschool', '../assets/backgrounds/Pet Town/pet_academy.png');
        this.load.image('petclass', '../assets/backgrounds/Pet Town/pet_classroom.png');
        this.load.image('oasis', '../assets/backgrounds/Oasis/oasis.png');
        this.load.image('dock', '../assets/backgrounds/Oasis/dock.png');
        
        this.load.audio('carnival_music', 'assets/sounds/Carnival.mp3');
        this.load.audio('castle_music', 'assets/sounds/Castle.mp3');
        this.load.audio('mtfantage_music', 'assets/sounds/Mt-Fantage.mp3');
        this.load.audio('pet_town_music', 'assets/sounds/Pet-Town.mp3');
    }
    
    create() {}
}