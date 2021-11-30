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
        // If the mouse is touching this cell, then draw()
        if (constants.mouse.x && constants.mouse.y && collision(this, constants.mouse)) {
            if (constants.debugMode) {
                constants.ctx.strokeStyle = "black";
                constants.ctx.strokeRect(this.x, this.y, this.width, this.height);
                constants.ctx.fillText(`${this.x} ${this.y}`, this.x, this.y)
            }
    
            // draw preview frame of champion
            // ONLY if there is a selected champion AND there isn't already a champion on the cell 
            if (constants.selectedChampionIndex >= 0) {
                for (const champion of constants.champions) {
                    // if any champion is on this cell, then return so it doesn't the preview
                    if (champion.x === this.x + constants.cellGap && champion.y === this.y + constants.cellGap) {
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