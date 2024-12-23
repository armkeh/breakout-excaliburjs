import * as ex from 'excalibur'
import * as logger from "./utils/logger"

import { isPopulatable } from './scenes/populatable'
import { isRestartable } from './scenes/restartable'
import { Classic } from './scenes/classic'

class Breakout extends ex.Engine {
  private score: number = 0

  constructor() {
    super()

    this.score = 0

    const classic = new Classic()
    classic.addScoreboard((by: number) => {
      this.score += by
      logger.info(`Scored ${ by }, new total is ${ this.score }`)
    })

    this.addScene('root', classic)
  }

  onInitialize(engine: ex.Engine) {
    // Log to screen
    logger.appendLogsToScreen(engine)
  }

  // Set some "global"(-ish) keybindings, such as pausing and restarting.
  public onPreUpdate(engine: ex.Engine, _delta: number) {
    if (isRestartable(this.currentScene)) {
      if (engine.input.keyboard.wasPressed(ex.Keys.R)) {
        logger.info("Restarting scene")
        this.currentScene.restart()
      }
    }

    if (isPopulatable(this.currentScene)) {
      if (engine.input.keyboard.wasPressed(ex.Keys.Space)) {
        if (this.currentScene.entities.length > 0) {
          logger.info("Pausing (clearing) current scene")
          this.currentScene.clear()
        } else {
          logger.info("Resuming (populating) current scene")
          this.currentScene.populate()
        }
      }
    }
  }
}

(new Breakout).start()
