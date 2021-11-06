import { constants } from './constants.js';

//
// https://opengameart.org/

// export class soundEffects {
//     constructor() {
//         this.sound = new Audio();
//         this.sound.src = "./assets/sound/testing.wav";
//     }
// }

export function createSoundEffect() {
    let sound = new Audio();
    sound.src = "./assets/sound/testing.wav";
    sound.play();
}