import * as ex from 'excalibur'

import { Bouncer } from './bouncer'
import { Ball } from './ball'
import * as logger from '../utils/logger'

const defaultColor = ex.Color.DarkGray

export class Brick extends ex.Actor implements Bouncer {
  private removeFromScene: () => void = () => {}

  private health: number = 1

  constructor(x: number, y: number , width: number, height: number, health?: number, removeAction?: () => void) {
    super({
      x: x, y: y,
      width: width, height: height,
      color: defaultColor,
      collisionType: ex.CollisionType.Fixed })

    if (health) {
      this.health = health
    }
    if (removeAction) {
      this.removeFromScene = removeAction
    }

    // Initialize color based on health
    this.colorByHealth()
  }

  private takeDamage(damage: number) {
    if (damage >= this.health) {
      logger.info(`Brick with ID ${ this.id } destroyed.`)
      this.removeFromScene()
      this.kill()
      return
    }

    this.health -= damage
    this.colorByHealth()
  }

  private colorByHealth() {
    this.color = (() => {
      switch (this.health) {
        case 3: return ex.Color.Blue
        case 2: return ex.Color.Violet
        case 1: return ex.Color.Red
        default: return defaultColor
      }})()
  }

  public bounce(_b: Ball) {
    this.takeDamage(1)
  }
}
