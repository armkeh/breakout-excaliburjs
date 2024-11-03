import * as ex from 'excalibur';
import * as logger from "./utils/logger";

import { isPopulatable } from './scenes/populatable';
import { Classic } from './scenes/classic'

class Breakout extends ex.Engine {
  constructor() {
    super({
      scenes: {
        'root': {
          scene: Classic
        },
      }
    })
  }

  // Log to screen
  onInitialize(engine: ex.Engine): void {
    logger.appendLogsToScreen(engine)
  }

  // Set some "global"(-ish) keybindings, such as pausing and restarting.
  public onPreUpdate(engine: ex.Engine, _delta: number): void {
    if (isPopulatable(this.currentScene)) {
      if (engine.input.keyboard.wasPressed(ex.Keys.R)) {
        logger.info("Restarting current scene")
        this.currentScene.clear()
        this.currentScene.populate()
      }

      if (engine.input.keyboard.wasPressed(ex.Keys.Space)) {
        logger.info("Pausing (clearing) current scene")
        this.currentScene.clear()
      }
    }
  }
}

(new Breakout).start()
