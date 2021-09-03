import { constants } from './constants.js';
import { collision } from './utils.js';
import { Projectile } from './projectiles.js';
import { floatingMessage } from './floatingMessage.js';

const files = {
    champion1: new Image(),
    champion2: new Image(),
}

files.champion1.src = "./assets/sprites/plant.png";
files.champion1.src = "./assets/test3.png";
files.champion2.src = "./assets/sprites/red.png";


class Champion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constants.cellSize - constants.cellGap * 2;
        this.height = constants.cellSize - constants.cellGap * 2;
        // this.width = 150;
        // this.height = 150;
        this.shooting = false;
        this.shootNow = false;
        this.health = 100;
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.minFrame = 0;
        this.maxFrame = 5;
        this.chosenChampion = chosenChampion;

    }

    draw() {
        // constants.ctx.fillStyle = "blue";
        // constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);


        if (this.chosenChampion === 0) {
            // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            constants.ctx.drawImage(files.champion1,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.chosenChampion === 1) {
            constants.ctx.drawImage(files.champion2,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        }

    }

    update() {
        if (constants.frame % 25 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === 1) this.shootNow = true;
        }

        
        // if champion sprite sheet has different frames, use if elif to adjust
        if (this.shooting) {
            this.minFrame = 0;
            this.maxFrame = 3;
        } else {
            this.minFrame = 4;
            this.maxFrame = 5;
        }

        if (this.shooting && this.shootNow) {
            constants.projectiles.push(new Projectile(this.x + 70, this.y + 50));
            this.shootNow = false;
        }
    }
}

export function updateChampionsFrame() {
    for (let i = 0; i < constants.champions.length; i++) {
        constants.champions[i].draw();
        constants.champions[i].update();
        if (constants.enemyPositions.indexOf(constants.champions[i].y) !== -1) {
            constants.champions[i].shooting = true;
        } else {
            constants.champions[i].shooting = false;
        }

        for (let j = 0; j < constants.enemies.length; j++) {
            if (constants.champions[i] && collision(constants.champions[i], constants.enemies[j])) {
                constants.enemies[j].movement = 0;
                constants.champions[i].health -= 0.2;
            }

            if (constants.champions[i] && constants.champions[i].health <= 0) {
                constants.champions.splice(i, 1);
                i--;
                constants.enemies[j].movement = constants.enemies[j].speed;
            }
        }
    }
}



// choose the fighter
let chosenChampion = -1;

const fighters = [
    document.getElementById("mask-fighter"),
    document.getElementById("vaccine-fighter")
];

fighters.forEach((fighter, index) => {
    fighter.addEventListener("click", () => {
        // when selected same champion twice, remove the selection
        if (fighter.classList.contains("active-selection")) {
            fighter.classList.remove("active-selection");
            chosenChampion = -1;
            return;
        }

        removeActiveBorders();
        fighter.classList.add("active-selection")
        chosenChampion = index;
    
        
    })
})

const removeActiveBorders = () => {
    fighters.forEach(fighter => {
        fighter.classList.remove("active-selection");
    })
}


// place the units
constants.canvas.addEventListener("click", function() {
    // find out how this works..
    const gridPositionX = constants.mouse.x - (constants.mouse.x % constants.cellSize) + constants.cellGap;
    const gridPositionY = constants.mouse.y - (constants.mouse.y % constants.cellSize) + constants.cellGap;
    // end if clicked on top toolbar display
    if (gridPositionY < constants.cellSize) return;
    // end if champion already exist in same position
    for (const champion of constants.champions) {
        if (champion.x === gridPositionX && champion.y === gridPositionY) {
            return;
        }
    }

    let championCost = 100;
    if (constants.numberOfResources >= championCost && chosenChampion >= 0) {
        constants.champions.push(new Champion(gridPositionX, gridPositionY));
        constants.numberOfResources -= championCost;
        console.log("it works");
    } else {
        constants.floatingMessages.push(new floatingMessage("Need more resources! OR FIGHTER NOT SELECTED",
            constants.mouse.x,
            constants.mouse.y,
            20, "blue"))
    }
})

