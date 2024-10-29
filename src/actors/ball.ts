import * as ex from 'excalibur'

import { isBouncer } from './bouncer'

export class Ball extends ex.Actor {
  private colliding = false

  constructor(x : number, y : number , radius : number, color : ex.Color) {
    super({
      x: x, y: y,
      radius: radius,
      color: color,
      collisionType: ex.CollisionType.Passive })
  }

  /** `strike`ing a `Ball` "adds" a `velocity` to its current velocity,
      relative to its current direction.
      That is, striking with `velocity` <10,20> would increase the absolute value
      of the ball's x velocity by 10 and the absolute value of its y velocity by 20.
      So providing positive values in `velocity` will always "speed the ball up".
      To decrease the ball's velocity, provide negative values for `velocity`.*/
  public strike(velocity: ex.Vector) {
    // Orient `velocity` to the current quadrant of movement
    if (this.vel.x < 0) {
      velocity.x *= -1
    }
    if (this.vel.y < 0) {
      velocity.y *= -1
    }

    this.vel.x += velocity.x
    this.vel.y += velocity.y

    // TODO: Handle acceleration, etc.
  }

  /** `serve`ing a `Ball` immediately cancels its current movement,
      and sets its new velocity after `serveTimeMilliseconds`. */
  public serve(velocity: ex.Vector, serveTimeMilliseconds: number) {
    this.vel = ex.vec(0,0)
    // TODO: Handle acceleration, etc.

    setTimeout(() => { this.strike(velocity) }, serveTimeMilliseconds)
  }

  // "Dumb" fallback collision logic for edge of screen (should prefer handling with actors on borders)
  public _postupdate(engine: ex.Engine, delta: number): void {
    // Sides of screen, reverse x velocity
    if (this.pos.x < this.width / 2 || this.pos.x + this.width / 2 > engine.drawWidth) {
      this.vel.x *= -1;
    }

    // Top of screen, reverse y velocity
    if (this.pos.y < this.height / 2) {
      this.vel.y *= -1;
    }

    super._postupdate(engine, delta)
  }

  public onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
   const intersection = contact.mtv.normalize()

    // Only "bounce" once per collision; reset the flag when collision ends (see onCollisionEnd)
    if (!this.colliding) {
      this.colliding = true
      // The largest component of intersection is our axis to flip
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    }

    super.onCollisionStart(self, other, side, contact)
  }

  public onCollisionEnd(self: ex.Collider, other: ex.Collider, side: ex.Side, lastContact: ex.CollisionContact): void {
    this.colliding = false

    if (isBouncer(other.owner)) {
      other.owner.bounce(this)
    }

    super.onCollisionEnd(self, other, side, lastContact)
  }
}
