import * as ex from 'excalibur'

import { Paddle } from '../actors/paddle'
import { Brick } from '../actors/brick'
import { Ball } from '../actors/ball'
import { Populatable } from './populatable'
import { Restartable } from './restartable'

/** A `Spawner` generates the `Actor`s to initially populate a `BreakoutScene`. */
type Spawner = (engine: ex.Engine) => [ Paddle[], Brick[], Ball[] ]

export class BreakoutScene extends ex.Scene implements Populatable, Restartable {
  /** The `Spawner` to initially populate this `BreakoutScene`.
      It should be overriden by the subclass for the specific scene;
      the default provided here would create an empty scene.
  */
  protected spawner: Spawner = () => [ [], [], [] ]

  private paddles: Paddle[] = []
  private bricks: Brick[] = []
  private balls: Ball[] = []

  public populate() {
    this.paddles.forEach((p) => { this.add(p) })
    this.bricks.forEach((b) => { this.add(b) })
    this.balls.forEach((b) => { this.add(b) })
  }

  /** `restart` the scene by clearing and removing all its `Actor`s,
      `spawn`ing new ones, and re-`populate`ing the scene.
      This can also be called to initially start the scene.
   */
  public restart() {
    this.clear()

    // Empty the actor lists
    this.paddles.length = 0
    this.bricks.length = 0
    this.balls.length = 0

    // Spawn fresh actors
    { [ this.paddles, this.bricks, this.balls ] = this.spawner(this.engine) }

    // And start the scene by serving the ball.
    this.balls.forEach((b) => { b.serve(ex.vec(100,100), 1000) }) // TODO: Make serve logic configurable

    this.populate()
  }

  onInitialize(engine: ex.Engine) {
    this.restart()
    super.onInitialize(engine)
  }
}
