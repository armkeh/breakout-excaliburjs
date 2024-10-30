import * as ex from 'excalibur'
import { Paddle } from '../actors/paddle'
import { Brick } from '../actors/brick'
import { Ball } from '../actors/ball'

export class BreakoutScene extends ex.Scene {
  protected paddles: Paddle[] = []
  protected bricks: Brick[] = []
  protected balls: Ball[] = []

  onInitialize(engine: ex.Engine): void {
    // Add all actors to scene, and serve the balls
    this.paddles.forEach((p) => { this.add(p) })
    this.bricks.forEach((b) => { this.add(b) })
    this.balls.forEach((b) => { this.add(b); b.serve(ex.vec(100,100), 1000) }) // TODO: Make serve logic configurable

    super.onInitialize(engine)
  }
}
