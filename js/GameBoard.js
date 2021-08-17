import { constants } from './constants.js';
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
            constants.ctx.strokeStyle = "black";
            constants.ctx.strokeRect(this.x, this.y, this.width, this.height);
            constants.ctx.fillText(`${this.x} ${this.y}`, this.x, this.y)
        }
    }
}

export function createGrid() {
    for (let y = constants.cellSize; y < constants.canvas.height; y += constants.cellSize) {
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