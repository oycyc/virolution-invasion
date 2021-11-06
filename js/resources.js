import { constants } from './constants.js';
import { floatingMessage } from './floatingMessage.js';
import { collision } from './utils.js';

import { createSoundEffect } from './soundEffects.js';

const amounts = [20, 30, 40, 50];

// resources to include:
// vaccine (shot), masks, hand sanitizer, spray, wipes
const files = []
files[0] = new Image();
files[0].src = "./assets/resources/mask.png";
files[1] = new Image();
files[1].src = "./assets/resources/syringe.png";


// constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
// constants.ctx.drawImage(files.champion1,
//     this.frameX * this.spriteWidth,
//     0,
//     this.spriteWidth,
//     this.spriteHeight,
//     this.x,
//     this.y,
//     this.width, this.height);


class Resource {
    constructor() {
        this.x = Math.random() * (constants.canvas.width - constants.cellSize);
        // this.y is current position, finalY is final
        this.y = 0;
        this.finalY = (Math.floor(Math.random() * 5) + 1) * constants.cellSize + 25;
        this.width = constants.cellSize * 0.6;
        this.height = constants.cellSize * 0.6;
        this.speed = 3;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];
        this.resourceFile = files[Math.floor(Math.random() * files.length)];
    }

    update() {
        if (this.y < this.finalY) {
            this.y += this.speed;

        }
    }

    draw() {
        constants.ctx.drawImage(this.resourceFile, 0, 0, 64, 64, this.x, this.y, this.width, this.height);
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
        constants.resources[i].update();
        constants.resources[i].draw();
        if (constants.resources[i] && constants.mouse.x && constants.mouse.y && collision(constants.resources[i], constants.mouse)) {
            createSoundEffect();
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