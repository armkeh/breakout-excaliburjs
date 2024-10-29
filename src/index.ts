import * as ex from 'excalibur';
import * as logger from "./utils/logger";

import { Paddle } from './actors/paddle'
import { Brick } from './actors/brick'
import { Ball } from './actors/ball'

function newGame(): ex.Engine {
  const game = new ex.Engine({
    // Window properties are set by electron-main.js.
    // TODO: check if there's a way to sync them from here, so this is more self-contained.
    // width: 800,
    // height: 600,
  });

  return game
}

function main() {
  const game = newGame()

  logger.appendLogsToScreen(game)

  game.add(new Paddle(150, game.drawHeight-40, 200, 20, ex.Color.Chartreuse))

  const rows = 3
  const columns = 3
  const spacing = 20
  const width = (game.drawWidth - (spacing * (2 + columns - 1))) / columns
  const height = 30
  const bricks: Brick[] = []
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      // Offset by spacing (away from the screen edge) plus half the brick (since entities are anchored at their center)
      let xOffset = spacing + width / 2
      let yOffset = spacing + height / 2
      let health = rows - row
      let brick = new Brick(xOffset + column * (width + spacing), yOffset + row * (height + spacing), width, height, health)
      game.add(brick)
      bricks.push(brick)
    }
  }

  const ball = new Ball(100, 300, 10, ex.Color.Red)
  game.add(ball)
  ball.serve(ex.vec(100,100), 1000)

  game.start()
}

main()
