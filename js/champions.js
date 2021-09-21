import { constants } from './constants.js';
import { championConsts } from './constants.js';
import { collision } from './utils.js';
import { Projectile } from './projectiles.js';
import { floatingMessage } from './floatingMessage.js';




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

    draw() {
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);

        constants.ctx.drawImage(constants.championFiles[this.selectedChampionIndex],
            this.frameX * championConsts.spriteWidth,
            0,
            championConsts.spriteWidth,
            championConsts.spriteHeight,
            this.x,
            this.y,
            championConsts.width, championConsts.height);
        constants.ctx.drawImage(constants.testingImg, 0 ,0)
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
            this.minFrame = 2;
            this.maxFrame = 5;
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

const fighters = [
    document.getElementById("mask-fighter"),
    document.getElementById("vaccine-fighter")
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

