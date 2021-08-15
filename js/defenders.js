import { constants, files } from './constants.js';
import { collision } from './collision.js';
import { Projectile } from './projectiles.js';


export class Defender {
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


        if (this.chosenDefender === 1) {
            // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            constants.ctx.drawImage(files.defender1,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.chosenDefender === 2) {
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



// organize this...

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}


const card2 = {
    x: 90,
    y: 10,
    width: 70,
    height: 85
}

let chosenDefender = 1;


export function chooseDefender() {
    // put these in the card object
    let card1stroke = "black";
    let card2stroke = "black";

    if (collision(constants.mouse, card1) && constants.mouse.clicked) {
        chosenDefender = 1;
    } else if (collision(constants.mouse, card2) && constants.mouse.clicked) {
        chosenDefender = 2;
    }

    if (chosenDefender === 1) {
        card1stroke = "gold";
        card2stroke = "black"
    } else if (chosenDefender === 2) {
        card1stroke = "black";
        card2stroke = "gold";
    } else {
        card1stroke = "black";
        card2stroke = "black";
    }

    constants.ctx.lineWidth = 1;
    constants.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    constants.ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    constants.ctx.strokeStyle = card1stroke;
    constants.ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    constants.ctx.drawImage(files.defender1, 0, 0, 167, 243, 0, 5, 167/3, 243/3)


    constants.ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    constants.ctx.strokeStyle = card2stroke;
    constants.ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
    constants.ctx.drawImage(files.defender2, 0, 0, 167, 243, 80, 5, 167/3, 243/3)
}

