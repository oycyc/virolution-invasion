import { constants } from './constants.js';

export class floatingMessage {
    constructor(message, x, y, size, color) {
        this.message = message;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }

    update() {
        this.y -= 0.3;
        this.lifeSpan += 1;
        if (this.opacity > 0.03) this.opacity -= 0.03;
    }

    draw() {
        constants.ctx.globalAlpha = this.opacity;
        constants.ctx.fillStyle = this.color;
        constants.ctx.font = this.size + "px Arial";
        constants.ctx.fillText(this.message, this.x, this.y);
        constants.ctx.globalAlpha = 1;
    }
} 

export function handleFloatingMessages() {
    for (let i = 0; i < constants.floatingMessages.length; i++) {
        constants.floatingMessages[i].update();
        constants.floatingMessages[i].draw();
        if (constants.floatingMessages[i].lifeSpan >= 50) {
            constants.floatingMessages.splice(i, 1);
            i--;
        }
    }
}