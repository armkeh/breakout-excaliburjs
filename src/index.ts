import * as ex from 'excalibur';
import * as logger from "./utils/logger";

import { Paddle } from './actors/paddle'
import { Brick } from './actors/brick'
import { Ball } from './actors/ball'

class Breakout extends ex.Engine {
  public start(): Promise<void> {
    // TODO: This setup should be a scene instead of hardcoded into the game.

    logger.appendLogsToScreen(this)

    this.add(new Paddle(150, this.drawHeight-40, 200, 20, ex.Color.Chartreuse))

    const rows = 3
    const columns = 3
    const spacing = 20
    const width = (this.drawWidth - (spacing * (2 + columns - 1))) / columns
    const height = 30
    const bricks: Brick[] = []
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        // Offset by spacing (away from the screen edge) plus half the brick (since entities are anchored at their center)
        let xOffset = spacing + width / 2
        let yOffset = spacing + height / 2
        let health = rows - row
        let brick = new Brick(xOffset + column * (width + spacing), yOffset + row * (height + spacing), width, height, health)
        this.add(brick)
        bricks.push(brick)
      }
    }

    const ball = new Ball(100, 300, 10, ex.Color.Red)
    this.add(ball)
    ball.serve(ex.vec(100,100), 1000)

    return super.start()
  }

  // public onPreUpdate(engine: ex.Engine, _delta: number): void {
  //   if (engine.input.keyboard.wasPressed(ex.Keys.R)) {
  //     // Restart game (or scene?)
  //   }
  // }
}

(new Breakout).start()
