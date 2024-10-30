import * as ex from 'excalibur'
import { Paddle } from '../actors/paddle'
import { Brick } from '../actors/brick'
import { Ball } from '../actors/ball'
import { BreakoutScene } from './breakoutscene'

export class Classic extends BreakoutScene {
  onInitialize(engine: ex.Engine): void {
    this.paddles.push(new Paddle(150, engine.drawHeight-40, 200, 20, ex.Color.Chartreuse))

    const rows = 3
    const columns = 3
    const spacing = 20
    const width = (engine.drawWidth - (spacing * (2 + columns - 1))) / columns
    const height = 30
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        // Offset by spacing (away from the screen edge) plus half the brick (since entities are anchored at their center)
        let xOffset = spacing + width / 2
        let yOffset = spacing + height / 2
        let health = rows - row
        let brick = new Brick(xOffset + column * (width + spacing), yOffset + row * (height + spacing), width, height, health)
        this.bricks.push(brick)
      }
    }

    const ball = new Ball(100, 300, 10, ex.Color.Red)
    this.balls.push(ball)

    super.onInitialize(engine)
  }
}
