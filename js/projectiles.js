import { constants } from './constants.js';
import { collision } from './utils.js';

export class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
    }

    update() {
        this.x += this.speed;

    }

    draw() {
        constants.ctx.fillStyle = "black";
        constants.ctx.beginPath();
        constants.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        constants.ctx.fill();
    }
}

export function handleProjectiles() {
    for (let i = 0; i < constants.projectiles.length; i++) {
        constants.projectiles[i].update();
        constants.projectiles[i].draw();


        for (let j = 0; j < constants.enemies.length; j++) {
            if (constants.enemies[j] && constants.projectiles[i] && collision(constants.projectiles[i], constants.enemies[j])) {
                constants.enemies[j].health -= constants.projectiles[i].power;
                constants.projectiles.splice(i , 1);
                i--;
            }
        }

        if (constants.projectiles[i] && constants.projectiles[i].x > constants.canvas.width - constants.cellSize) {
            constants.projectiles.splice(i, 1);
            i--;
        }
        // console.log("projectiles " + projectiles.length)
    }
}