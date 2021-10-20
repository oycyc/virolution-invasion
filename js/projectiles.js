import { constants } from './constants.js';
import { collision } from './utils.js';


const championProjectiles = [ // corresponds w/ the index of fighters
    new Image(),
    new Image(),
    new Image(),
    new Image()
];

championProjectiles[0].src = "./assets/champion-projectiles/mask-projectile.png";
championProjectiles[1].src = "./assets/champion-projectiles/vaccine-projectile.png";
championProjectiles[2].src = "./assets/champion-projectiles/soap-bubble-projectile.png";
championProjectiles[3].src = "./assets/champion-projectiles/pill-projectile.png";


export class Projectile {
    constructor(x, y, championIndex) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.power = 20;
        this.speed = 5;
        this.championIndex = championIndex;
    }

    update() {
        this.x += this.speed;

    }

    draw() {
        constants.ctx.drawImage(championProjectiles[this.championIndex], 
            0, 0, this.width, this.height, this.x, this.y, 64, 64);
        // constants.ctx.fillStyle = "black";
        // constants.ctx.beginPath();
        // constants.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        // constants.ctx.fill();
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