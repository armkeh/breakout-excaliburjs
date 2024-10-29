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

  // TODO: Create multiple bricks in a loop. Keep a list for tracking win condition.
  const brick = new Brick(game.drawWidth / 2, 40, 200, 20, 3)
  game.add(brick)

  const ball = new Ball(100, 300, 10, ex.Color.Red)
  game.add(ball)
  ball.serve(ex.vec(100,100), 1000)

  game.start()
}

main()
