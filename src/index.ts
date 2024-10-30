import * as ex from 'excalibur';
import * as logger from "./utils/logger";

import { Classic } from './scenes/classic'

class Breakout extends ex.Engine {
  constructor() {
    super({
      scenes: {
        root: {
          scene: Classic
        },
      }
    })
  }

  // Log to screen
  onInitialize(engine: ex.Engine): void {
    logger.appendLogsToScreen(engine)
  }

  // public onPreUpdate(engine: ex.Engine, _delta: number): void {
  //   if (engine.input.keyboard.wasPressed(ex.Keys.R)) {
  //     // Restart game (or scene?)
  //   }
  // }
}

(new Breakout).start()
