import { constants, files } from './constants.js';
import { collision } from './utils.js';
import { Projectile } from './projectiles.js';
import { floatingMessage } from './floatingMessage.js';

class Defender {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constants.cellSize - constants.cellGap * 2;
        this.height = constants.cellSize - constants.cellGap * 2;
        this.shooting = false;
        this.shootNow = false;
        this.health = 100;
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 167;
        this.spriteHeight = 243;
        this.minFrame = 0;
        this.maxFrame = 1;
        this.chosenDefender = chosenDefender;

    }

    draw() {
        // constants.ctx.fillStyle = "blue";
        // constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);


        if (this.chosenDefender === 0) {
            // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            constants.ctx.drawImage(files.defender1,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.chosenDefender === 1) {
            constants.ctx.drawImage(files.defender2,
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
        if (constants.frame % 50 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === 1) this.shootNow = true;
        }

        
        // if defender sprite sheet has different frames, use if elif to adjust
        if (this.shooting) {
            this.minFrame = 0;
            this.maxFrame = 1;
        } else {
            this.minFrame = 0;
            this.maxFrame = 1;
        }

        if (this.shooting && this.shootNow) {
            constants.projectiles.push(new Projectile(this.x + 70, this.y + 50));
            this.shootNow = false;
        }
    }
}

export function handleDefenders() {
    for (let i = 0; i < constants.defenders.length; i++) {
        constants.defenders[i].draw();
        constants.defenders[i].update();
        if (constants.enemyPositions.indexOf(constants.defenders[i].y) !== -1) {
            constants.defenders[i].shooting = true;
        } else {
            constants.defenders[i].shooting = false;
        }

        for (let j = 0; j < constants.enemies.length; j++) {
            if (constants.defenders[i] && collision(constants.defenders[i], constants.enemies[j])) {
                constants.enemies[j].movement = 0;
                constants.defenders[i].health -= 0.2;
            }

            if (constants.defenders[i] && constants.defenders[i].health <= 0) {
                constants.defenders.splice(i, 1);
                i--;
                constants.enemies[j].movement = constants.enemies[j].speed;
            }
        }
    }
}



// choose the fighter
let chosenDefender = -1;

const fighters = [
    document.getElementById("mask-fighter"),
    document.getElementById("vaccine-fighter")
];

fighters.forEach((fighter, index) => {
    fighter.addEventListener("click", () => {
        // when selected same champion twice, remove the selection
        if (fighter.classList.contains("active-selection")) {
            fighter.classList.remove("active-selection");
            chosenDefender = -1;
            return;
        }

        removeActiveBorders();
        fighter.classList.add("active-selection")
        chosenDefender = index;
    
        
    })
})

const removeActiveBorders = () => {
    fighters.forEach(fighter => {
        fighter.classList.remove("active-selection");
    })
}


// place defenders
constants.canvas.addEventListener("click", function() {
    // find out how this works..
    const gridPositionX = constants.mouse.x - (constants.mouse.x % constants.cellSize) + constants.cellGap;
    const gridPositionY = constants.mouse.y - (constants.mouse.y % constants.cellSize) + constants.cellGap;
    // end if clicked on top toolbar display
    if (gridPositionY < constants.cellSize) return;
    // end if defender already exist in same position
    for (const defender of constants.defenders) {
        if (defender.x === gridPositionX && defender.y === gridPositionY) {
            return;
        }
    }

    let defenderCost = 100;
    if (constants.numberOfResources >= defenderCost && chosenDefender >= 0) {
        constants.defenders.push(new Defender(gridPositionX, gridPositionY));
        constants.numberOfResources -= defenderCost;
        console.log("it works");
    } else {
        constants.floatingMessages.push(new floatingMessage("Need more resources! OR FIGHTER NOT SELECTED",
            constants.mouse.x,
            constants.mouse.y,
            20, "blue"))
    }
})

