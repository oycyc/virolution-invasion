import { constants } from './constants.js';
import { floatingMessage } from './floatingMessage.js';


const enemyTypes = [new Image(), new Image(), new Image(), new Image()];
enemyTypes[0].src = "./assets/virus-sprites/level1/level1sprite.png";
enemyTypes[1].src = "./assets/virus-sprites/level2/level2sprite.png";
enemyTypes[2].src = "./assets/virus-sprites/level3/level3sprite.png";
enemyTypes[3].src = "./assets/virus-sprites/level4/level4sprite.png";

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
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.attacking = false;
    }

    update() {
        if (this.attacking) { // attacking sprites
            this.minFrame = 8;
            this.maxFrame = 14;
        }
        if (this.movement != 0) { // movement = 0 when attacking, default walking sprites
            this.minFrame = 0;
            this.maxFrame = 7;
        }

        this.x -= this.movement;
        if (constants.frame % 8 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

    }

    draw() {
        if (constants.debugMode) {
            constants.ctx.fillStyle = "black";
            constants.ctx.font = "30px Arial";
            constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        }

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