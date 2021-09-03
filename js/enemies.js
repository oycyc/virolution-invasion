import { constants } from './constants.js';
import { floatingMessage } from './floatingMessage.js';


const enemyTypes = [new Image(), new Image()];
enemyTypes[0].src = "./assets/sprites/dino.png";
enemyTypes[1].src = "./assets/sprites/dino2.png";

class Enemy {
    constructor(verticalPosition) {
        this.x = constants.canvas.width;
        this.y = verticalPosition;
        this.width = constants.cellSize - constants.cellGap * 2;
        this.height = constants.cellSize - constants.cellGap * 2;
        // this.speed = Math.random() * 0.2 + 0.4;
        this.speed = 1;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 680;
        this.spriteHeight = 472;
    }

    update() {
        this.x -= this.movement;
        if (constants.frame % 8 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

    }

    draw() {
        // constants.ctx.fillStyle = "red";
        // constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        constants.ctx.drawImage(this.enemyType,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width, this.height);
    }
}

export function handleEnemies() {
    for (let i = 0; i < constants.enemies.length; i++) {
        constants.enemies[i].update();
        constants.enemies[i].draw();
        // when it reaches end of the board
        if (constants.enemies[i].x < 0) {
            constants.gameOver = true;
            // temp to figure out resizing
            // continue;
        }

        if (constants.enemies[i].health <= 0) {
            let gainedResources = constants.enemies[i].maxHealth / 10;
            constants.numberOfResources += gainedResources;
            constants.score += gainedResources;

            constants.floatingMessages.push(new floatingMessage("+" + gainedResources,
                constants.enemies[i].x,
                constants.enemies[i].y,
                30, "black"));
                constants.floatingMessages.push(new floatingMessage("+" + gainedResources,
                250,
                50,
                30, "gold"));


            constants.enemyPositions.splice(constants.enemyPositions.indexOf(constants.enemies[i].y), 1);
            constants.enemies.splice(i, 1);
            i--;
        }
    }

    if (constants.frame % constants.enemiesInterval === 0 && constants.score < constants.winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * constants.cellSize + constants.cellGap;
        constants.enemies.push(new Enemy(verticalPosition));
        constants.enemyPositions.push(verticalPosition);
        //console.log(constants.enemiesInterval)
        
        constants.enemiesInterval -= 200;
        // console.log(constants)
        if (constants.enemiesInterval > 120) {
            constants.enemiesInterval -= 100;
        }
        // console.log(enemyPositions);
    }
}