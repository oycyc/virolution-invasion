import { constants } from './constants.js';
import { floatingMessage } from './floatingMessage.js';
import { collision } from './collision.js';

const amounts = [20, 30, 40];
class Resource {
    constructor() {
        this.x = Math.random() * (canvas.width - constants.cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * constants.cellSize + 25;
        this.width = constants.cellSize * 0.6;
        this.height = constants.cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];

    }

    draw() {
        constants.ctx.fillStyle = "yellow";
        constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "20px Arial";
        constants.ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
}

export function handleResources() {
    if (constants.frame % 500 === 0 && constants.score < constants.winningScore) {
        constants.resources.push(new Resource());
    }

    for (let i = 0; i < constants.resources.length; i++) {
        constants.resources[i].draw();
        if (constants.resources[i] && constants.mouse.x && constants.mouse.y && collision(constants.resources[i], constants.mouse)) {
            constants.numberOfResources += constants.resources[i].amount;
            constants.floatingMessages.push(new floatingMessage("+" + constants.resources[i].amount,
            constants.resources[i].x,
            constants.resources[i].y,
            30, "black"));
            constants.floatingMessages.push(new floatingMessage("+" + constants.resources[i].amount,
                250,
                50,
                30, "gold"));
            // remove after splice
            constants.resources.splice(i, 1);
            i--;
        }
    }
}