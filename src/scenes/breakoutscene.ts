import * as ex from 'excalibur'

import * as logger from '../utils/logger'
import { Paddle } from '../actors/paddle'
import { Brick } from '../actors/brick'
import { Ball } from '../actors/ball'
import { Populatable } from './populatable'
import { Restartable } from './restartable'

/** A `Spawner` generates the `Actor`s to initially populate a `BreakoutScene`.
    Additionally it provides to `BreakoutScene` the actors which gate winning
    and losing the game.
*/
type Spawner = (engine: ex.Engine) => [
  paddles: Paddle[],
  bricks: Brick[],
  balls: Ball[],
  winConditions: ex.Actor[],
  loseConditions: ex.Actor[],
]

export class BreakoutScene extends ex.Scene implements Populatable, Restartable {
  /** The `Spawner` to initially populate this `BreakoutScene`.
      It should be overriden by the subclass for the specific scene;
      the default provided here would create an empty scene.
  */
  protected spawner: Spawner = () => [ [], [], [], [], [] ]

  private paddles: Paddle[] = []
  private bricks: Brick[] = []
  private balls: Ball[] = []
  
  /** The `winConditions` of the scene the IDs of `ex.Actor`s which
      gate the winning of the scene. The scene should provide a list of `ex.Actor`s
      out of the `spawner` method; the IDs of those actors are then used to construct
      this map.
  */
  private winConditions: Map<number, Boolean> = new Map()

  /** The `loseConditions` of the scene are the IDs of actors which
      gate the losing of the scene. They are set up and used
      identically to `winConditions`, except they trigger a loss.
   */
  private loseConditions: Map<number, Boolean> = new Map()

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
    var winConditionActors: ex.Actor[], loseConditionActors: ex.Actor[]
    { [ this.paddles, this.bricks, this.balls, winConditionActors, loseConditionActors ] = this.spawner(this.engine) }

    winConditionActors.forEach((a) => {
      this.winConditions.set(a.id, false)
    })
    loseConditionActors.forEach((a) => {
      this.loseConditions.set(a.id, false)
    })

    // And start the scene by serving the ball.
    this.balls.forEach((b) => { b.serve(ex.vec(100,100), 1000) }) // TODO: Make serve logic configurable

    this.populate()
  }

  public removeActor(a: ex.Actor) {
    /* TODO: Remove actor from paddle, brick and ball lists (splice lists) */

    // Update win and lose conditions
    if (this.winConditions.has(a.id)) {
      logger.info(`Win condition with ID ${ a.id } triggered!`)
      this.winConditions.set(a.id, true)
    }
    if (this.loseConditions.has(a.id)) {
      logger.info(`Lose condition with ID ${ a.id } triggered!`)
      this.loseConditions.set(a.id, true)
    }
    
    // Check for wins and losses
    if (! Array.from(this.winConditions.values()).includes(false)) {
      logger.info("You won the game!")
    }
    if (! Array.from(this.loseConditions.values()).includes(false)) {
      logger.info("You lost the game!")
    }
  }

  onInitialize(engine: ex.Engine) {
    this.restart()
    super.onInitialize(engine)
  }
}
