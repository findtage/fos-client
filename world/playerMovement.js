export function setupMovements(scene, player, moveSpeed) {
    let targetPosition = null;
    moveSpeed = 250
    // Handle click-to-move
    scene.input.on('pointerup', (pointer) => {
        if (pointer.event.defaultPrevented) return;
        if (player.isJumping || player.isCrying) return;
        targetPosition = { x: pointer.worldX, y: pointer.worldY }; // Store target position
    });

    // Return the `update` function to manage smooth movement
    return (delta) => {
        if (targetPosition) {
            // Calculate distance to the target
            const distance = Phaser.Math.Distance.Between(player.x, player.y, targetPosition.x, targetPosition.y);

            if (distance < 4) {
                // Stop moving when close enough
                player.setPosition(targetPosition.x, targetPosition.y);
                targetPosition = null;
            } else {
                // Calculate angle and move the player
                const angle = Phaser.Math.Angle.Between(player.x, player.y, targetPosition.x, targetPosition.y);
                const velocityX = Math.cos(angle) * (moveSpeed * (delta / 1000));
                const velocityY = Math.sin(angle) * (moveSpeed * (delta / 1000));

                // Flip the avatar container based on movement direction
                if (velocityX > 0 && player.base.getData('direction') !== 'right') {
                    // Moving right: flip to face right
                    player.setScale(-1, 1);
                    // Keep name tag facing the same direction
                    player.nameTag.setScale(-1, 1);
                    player.base.setData('direction', 'right');
                    player.direction = 'right';
                } else if (velocityX < 0 && player.base.getData('direction') !== 'left') {
                    // Moving left: keep the initial left-facing direction
                    player.setScale(1, 1);
                    player.nameTag.setScale(1, 1);
                    player.base.setData('direction', 'left');
                    player.direction = 'left';
                }

                player.x += velocityX;
                player.y += velocityY;
            }
        }
    };
}

export function setupMovement(scene, player, moveSpeed) {
    let targetPosition = null;
    moveSpeed = 275;

    // Internal precise positions (floating-point)
    let preciseX = player.x;
    let preciseY = player.y;

    // Handle click-to-move
    scene.input.on('pointerup', (pointer) => {
        if (pointer.event.defaultPrevented) return;
        if (player.isJumping || player.isCrying) return;
        targetPosition = { x: pointer.worldX, y: pointer.worldY };
    });

    return (delta) => {
        if (targetPosition) {
            const distance = Phaser.Math.Distance.Between(preciseX, preciseY, targetPosition.x, targetPosition.y);

            if (distance < 4) {
                // Arrived: snap to target (important!)
                preciseX = targetPosition.x;
                preciseY = targetPosition.y;
                player.setPosition(Math.round(preciseX), Math.round(preciseY));
                targetPosition = null;
            } else {
                const angle = Phaser.Math.Angle.Between(preciseX, preciseY, targetPosition.x, targetPosition.y);
                const velocityX = Math.cos(angle) * (moveSpeed * (delta / 1000));
                const velocityY = Math.sin(angle) * (moveSpeed * (delta / 1000));

                preciseX += velocityX;
                preciseY += velocityY;

                // Update the player's *visual* position by rounding
                player.setPosition(Math.round(preciseX), Math.round(preciseY));

                // Direction flipping (same as before)
                if (velocityX > 0 && player.base.getData('direction') !== 'right') {
                    player.setScale(-1, 1);
                    player.nameTag.setScale(-1, 1);
                    player.base.setData('direction', 'right');
                    player.direction = 'right';
                } else if (velocityX < 0 && player.base.getData('direction') !== 'left') {
                    player.setScale(1, 1);
                    player.nameTag.setScale(1, 1);
                    player.base.setData('direction', 'left');
                    player.direction = 'left';
                }

            }
        }
    };
}
