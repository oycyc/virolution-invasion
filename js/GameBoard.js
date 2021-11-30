import { constants } from './constants.js';
import { championConsts } from './constants.js';
import { collision } from './utils.js';


class Cell {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.width = constants.cellSize;
        this.height = constants.cellSize;
    }

    draw() {
        // make sure mouse has a position and it's colliding
        if (constants.mouse.x && constants.mouse.y && collision(this, constants.mouse)) {
            if (constants.debugMode) {
                constants.ctx.strokeStyle = "black";
                constants.ctx.strokeRect(this.x, this.y, this.width, this.height);
                constants.ctx.fillText(`${this.x} ${this.y}`, this.x, this.y)
            }
    

            // if (constants.selectedChampionIndex >= 0) {
            //     constants.ctx.globalAlpha = 0.45;
            //     constants.ctx.drawImage(constants.championFiles[constants.selectedChampionIndex],
            //         0, // x frame of the sprite
            //         0, // y frame
            //         championConsts.spriteWidth,
            //         championConsts.spriteHeight,
            //         this.x,
            //         this.y,
            //         championConsts.width, championConsts.height);
            //     constants.ctx.globalAlpha = 1;
            // }



            // for (const champion of constants.champions) {
            //     if (champion.x === gridPositionX && champion.y === gridPositionY) {
            //         return;
            //     }
            // }

            // calculate grid position at this point
            const gridPositionX = constants.mouse.x - (constants.mouse.x % constants.cellSize) + constants.cellGap;
            const gridPositionY = constants.mouse.y - (constants.mouse.y % constants.cellSize) + constants.cellGap;
            // draw preview frame of champion
            if (constants.selectedChampionIndex >= 0) {
                for (const champion of constants.champions) {
                    if (champion.x === gridPositionX && champion.y === gridPositionY) {
                        return;
                    }
                }
                constants.ctx.globalAlpha = 0.45;
                constants.ctx.drawImage(constants.championFiles[constants.selectedChampionIndex],
                    0, // x frame of the sprite
                    0, // y frame
                    championConsts.spriteWidth,
                    championConsts.spriteHeight,
                    this.x,
                    this.y,
                    championConsts.width, championConsts.height);
                constants.ctx.globalAlpha = 1;
            }

            
        }
    }
}

export function createGrid() {
    for (let y = constants.cellSize; y < constants.canvas.height; y += constants.cellSize) {
    // for (let y = 0; y < constants.canvas.height; y += constants.cellSize) {
        for (let x = 0; x < constants.canvas.width; x += constants.cellSize) {
            constants.gameGrid.push(new Cell(x, y));
        }
    }
}

export function handleGameGrid() {
    for (let i = 0; i < constants.gameGrid.length; i++) {
        constants.gameGrid[i].draw();
    }
}