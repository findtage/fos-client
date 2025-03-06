export function castleCatalog(scene, player){
    // Store Logic
    let shopIcon = scene.add.image(766, 36, 'shopIcon').setScrollFactor(0).setOrigin(0.5, 0.5).setDepth(1.5).setInteractive();

    shopIcon.on('pointerup', (pointer, localX, localY, event) => {
        event.stopPropagation();
        openCatalog(scene, player)
    });
}

function openCatalog(scene, player){
    console.log("Show Homes Here")
}
