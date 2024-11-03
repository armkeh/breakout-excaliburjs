import * as ex from 'excalibur'

import { Paddle } from '../actors/paddle'
import { Brick } from '../actors/brick'
import { Ball } from '../actors/ball'
import { Populatable } from './populatable'

export class BreakoutScene extends ex.Scene implements Populatable {
  protected paddles: Paddle[] = []
  protected bricks: Brick[] = []
  protected balls: Ball[] = []

  /** `populate` adds the scene's paddle, brick and ball actors
      to the scene, and serves the balls.

      This is intended to be an inverse of the builtin `clear` method
      for scenes. As such, `populate` does not (unless overriden)
      modify the actors, e.g., by setting to their initial settings.
  */
  public populate() {
    this.paddles.forEach((p) => { this.add(p) })
    this.bricks.forEach((b) => { this.add(b) })
    this.balls.forEach((b) => { this.add(b) })
  }

  onInitialize(engine: ex.Engine) {
    this.populate() // Prevent the need to populate the scene on first initialization.
    this.balls.forEach((b) => { b.serve(ex.vec(100,100), 1000) }) // TODO: Make serve logic configurable
    super.onInitialize(engine)
  }
}
