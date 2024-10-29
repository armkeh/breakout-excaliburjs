import * as ex from 'excalibur'

import { Bouncer } from './bouncer'
import { Ball } from './ball'
import * as logger from '../utils/logger'

export class Paddle extends ex.Actor implements Bouncer {
  constructor(x : number, y : number , width : number, height : number, color : ex.Color) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: color,
      collisionType: ex.CollisionType.Fixed })
  }

  public bounce(b: Ball) {
    logger.info("A paddle has bounced a ball")

    // Speed the ball up a bit
    b.strike(ex.vec(10, 10))
  }

  public update(engine: ex.Engine, delta: number): void {
    if (
      engine.input.keyboard.isHeld(ex.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Keys.Left)
    ) {
      this.pos.x -= 4
    }

    if (
      engine.input.keyboard.isHeld(ex.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Keys.Right)
    ) {
      this.pos.x += 4
    }

    // Flip to opposite side
    if (
      engine.input.keyboard.wasPressed(ex.Keys.S) ||
      engine.input.keyboard.wasPressed(ex.Keys.Down)
    ) {
      this.pos.x = engine.drawWidth - this.pos.x
    }

    super.update(engine, delta)
  }
}
