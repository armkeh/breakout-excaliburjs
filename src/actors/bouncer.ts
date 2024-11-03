import { Actor } from 'excalibur'

/** `Bouncer`'s are entities which cause an `Actor` to bounce upon collision
    (Whatever that may mean for the actor type).
    For example, both `Paddle`s and `Brick`s cause a `Ball` to bounce. */
export interface Bouncer {
  /** `bounce` may be called by a `Actor` when it collides with a `Bouncer`. */
  bounce(b: Actor): void;
}

/** Type guard for `Bouncer` objects */
export function isBouncer(object: any): object is Bouncer {
  return 'bounce' in object;
}
