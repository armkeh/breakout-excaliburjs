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
    // Speed the ball up a bit
    b.strike(ex.vec(10, 10))
  }

  private withinBounds(proposed: number, min: number, max: number): Boolean {
    return min < proposed && proposed < max
  }

  public update(engine: ex.Engine, delta: number) {
    var proposedX = this.pos.x

    if (
      engine.input.keyboard.isHeld(ex.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Keys.Left)
    ) {
      proposedX -= 4
    }

    if (
      engine.input.keyboard.isHeld(ex.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Keys.Right)
    ) {
      proposedX += 4
    }

    // Flip to opposite side
    if (
      engine.input.keyboard.wasPressed(ex.Keys.S) ||
      engine.input.keyboard.wasPressed(ex.Keys.Down)
    ) {
      proposedX = engine.drawWidth - proposedX
    }

    // Rudimentary out-of-bounds protection.
    // This will fail (probably catastrophically) if paddles have acceleration;
    // specifically, paddles could become trapped offscreen (partially or fully).
    // See https://github.com/armkeh/breakout-excaliburjs/issues/5
    if (this.withinBounds(proposedX, 0 + this.width / 2, engine.drawWidth - this.width / 2)) {
      this.pos.x = proposedX
    } else {
      logger.warn(`Preventing paddle with ID ${ this.id } from going out-of-bounds.`)
    }

    super.update(engine, delta)
  }
}
