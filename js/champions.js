import { constants } from './constants.js';
import { championConsts } from './constants.js';
import { collision } from './utils.js';
import { Projectile } from './projectiles.js';
import { floatingMessage } from './floatingMessage.js';

const healthPaddingX = 32.5;
const healthPaddingY = -2;
const healthLineWidth = 5;


class Champion {
    constructor(x, y) {
        this.selectedChampionIndex = constants.selectedChampionIndex;
        this.x = x;
        this.y = y;
        // display dimensions (grid)
        this.width = championConsts.width;
        this.height = championConsts.height;;
        // shooting determines the shooting frame, shootNow determines when projectile fires
        this.shooting = false;
        this.shootNow = false;
        // frame of the spritesheet
        this.frameX = 0;
        // first frame and last frame
        this.minFrame = 0;
        this.maxFrame = 5;


        // make maxFrame and health arguments
        // timer used for special effects particular to this champion, perhaps ability
        this.health = 100;
        this.timer = 0;
    }
    
    displayHealthBar() { // displays health bar in 75% size (relative to 100) to take less space
        // x0, y0: starting point (beginning of health bar) - x1, y2: ending point (current health)
        const grd = constants.ctx.createLinearGradient(this.x + healthPaddingX, this.y + healthPaddingY,
            this.x + Math.floor(this.health * 0.75) + healthPaddingX, this.y + healthPaddingY);

        if (this.health >= 50) { // green gradient
            grd.addColorStop(0, '#00b09b');
            grd.addColorStop(1, '#96c93d');
        } else { // red gradient
            grd.addColorStop(0, '#cb356b');
            grd.addColorStop(1, '#bd3f32');
        }

        // draws the gray full background health bar
        constants.ctx.strokeStyle = "gray";
        constants.ctx.beginPath();
        constants.ctx.moveTo(this.x + healthPaddingX, this.y + healthPaddingY);
        constants.ctx.lineWidth = healthLineWidth;
        constants.ctx.lineCap = "round";
        constants.ctx.lineTo(this.x + (100 * 0.75) + healthPaddingX, this.y + healthPaddingY);
        constants.ctx.stroke();
        // draws the current health in the bar with the gradient
        constants.ctx.strokeStyle = grd;
        constants.ctx.beginPath();
        constants.ctx.moveTo(this.x + healthPaddingX, this.y + healthPaddingY);
        constants.ctx.lineWidth = healthLineWidth;
        constants.ctx.lineCap = "round";
        constants.ctx.lineTo(this.x + Math.floor(this.health  * 0.75) + healthPaddingX, this.y + healthPaddingY);
        constants.ctx.stroke();
        // reset lineWidth
        constants.ctx.lineWidth = 1;
    }

    draw() {
        if (constants.debugMode) { // write out actual health (health/100)
            constants.ctx.fillStyle = "black";
            constants.ctx.font = "30px Arial";
            constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);
        }

        this.displayHealthBar();

        constants.ctx.drawImage(constants.championFiles[this.selectedChampionIndex],
            this.frameX * championConsts.spriteWidth,
            0,
            championConsts.spriteWidth,
            championConsts.spriteHeight,
            this.x,
            this.y,
            championConsts.width, championConsts.height);
    }



    update() {
        if (constants.frame % 25 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            // last frame where the shot will be fired
            if (this.frameX === 5) this.shootNow = true;
        }

        
        // if champion sprite sheet has different frames, use if elif to adjust
        if (this.shooting) {
            // this.minFrame = 2;
            // this.maxFrame = 5;
            this.minFrame = 2;
            this.maxFrame = 5;
        } else {
            this.minFrame = 0;
            this.maxFrame = 1;
        }

        if (this.shooting && this.shootNow) {
            constants.projectiles.push(new Projectile(this.x + 70, this.y + 33.5, this.selectedChampionIndex));
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
                constants.enemies[j].attacking = true;
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

const fighters = [
    document.getElementById("mask-fighter"),
    document.getElementById("vaccine-fighter"),
    document.getElementById("soap-fighter"),
    document.getElementById("pill-fighter"),
];

fighters.forEach((fighter, index) => {
    fighter.addEventListener("click", () => {
        // when selected same champion twice, remove the selection
        if (fighter.classList.contains("active-selection")) {
            fighter.classList.remove("active-selection");
            resetChampionIndex();
            return;
        }

        removeActiveBorders();
        fighter.classList.add("active-selection")
        constants.selectedChampionIndex = index;
    
        
    })
})

const removeActiveBorders = () => {
    fighters.forEach(fighter => {
        fighter.classList.remove("active-selection");
    })
}

const resetChampionIndex = () => {
    constants.selectedChampionIndex = -1;
}


// place the units
constants.canvas.addEventListener("click", function() {
    // calculate current mouse position on the grid
    const gridPositionX = constants.mouse.x - (constants.mouse.x % constants.cellSize) + constants.cellGap;
    const gridPositionY = constants.mouse.y - (constants.mouse.y % constants.cellSize) + constants.cellGap;
    // end if clicked on top toolbar display
    if (gridPositionY < constants.cellSize) return;

    for (const champion of constants.champions) {
        if (champion.x === gridPositionX && champion.y === gridPositionY) { // checks if champion exists
            if (constants.removalStatus) { // if removalStatus is true, then remove 
                console.log("will remove this1!!");
            }
            return; // end if champion exists, no need to remove nor place new champion
        }
    }
    


    let championCost = 100;
    if (constants.numberOfResources >= championCost && constants.selectedChampionIndex >= 0) {
        constants.champions.push(new Champion(gridPositionX, gridPositionY));
        constants.numberOfResources -= championCost;
        removeActiveBorders();
        resetChampionIndex();
        console.log("it works");
    } else {
        constants.floatingMessages.push(new floatingMessage("Need more resources! OR FIGHTER NOT SELECTED",
            constants.mouse.x,
            constants.mouse.y,
            20, "blue"))
    }
})

