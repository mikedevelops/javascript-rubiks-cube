import 'pixi.js'
import Grid from './classes/Grid'
import { SIZE } from './helpers/globals'
import { colors, getColorByKey, getRandomTileColor, getTileColorByIndex } from './helpers/colors'

const { autoDetectRenderer, Container } = PIXI
const { InteractionData } = PIXI.interaction

PIXI.utils.skipHello()

/**
 * Setup renderer & initialise stage
 */
const stage = new Container()
const renderer = new autoDetectRenderer(SIZE, SIZE, {
    backgroundColor: getColorByKey('black'),
    resolution: 1
})

document.body.appendChild(renderer.view)

/**
 * scene globals
 */
let grid

/**
 * initialise objects and call first update
 */
function start () {
    // initialise grid
    grid = new Grid()
    stage.addChild(grid)

    update()
}

/**
 * update loop
 */
function update () {
    // render everything on the stage
    renderer.render(stage)
    requestAnimationFrame(update)
}

start()
