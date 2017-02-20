import 'pixi.js'
import { AREA, SCALE, SIZE, UNIT } from '../helpers/globals'
import { getTileColorByIndex } from '../helpers/colors'
import Tile from './Tile'

export default class Grid extends PIXI.Container {
    constructor () {
        super()
        this.rows = SIZE / SCALE
        this.cols = SIZE / SCALE
        this.tiles = { x: [], y: [] }
        this.activeRow = 0

        this.setup()
        this.buildGrid()
    }

    /**
     * build tiles object and fill with null
     * references for now
     */
    setup () {
        for (let i = 0; i <= AREA; i++) {
            this.tiles.x[i] = []
            this.tiles.x[i].forEach(tile => {
                // returning null here as we just need a value
                // other than undefined
                return null
            })
        }
    }

    /**
     * build tile grid and instantiate Tiles
     */
    buildGrid () {
        let x = 0
        let y = 0
        let colorIndex = 0

        // TODO could this be done with recursion?
        for (let i = 0; i < AREA; i++) {
            const tile = new Tile(getTileColorByIndex(colorIndex), x, y)

            // store ref to Tile in tiles array
            this.tiles.x[y].push(tile)
            this.addChild(tile)

            x++

            if (x && x % SCALE === 0) {
                colorIndex++
            }

            if (x && x % (SCALE * 4) === 0)  {
                x = 0
                colorIndex = 0
                y++
            }
        }
    }

    /**
     * return first tile (x axis) on a given row index
     */
    getFirstTile (row) {
        return this.tiles.x[row][0]
    }

    /**
     * return last tile (x axis) on a given row index
     */
    getLastTile (row) {
        return this.tiles.x[row][this.tiles.x.length - 1]
    }

    /**
     * move a row (by index) a set number of pixels
     */
    moveRow (row, distance) {
        const firstTile = this.getFirstTile(row)
        const lastTile = this.getLastTile(row)

        this.activeRow = row

        // if the row has moved by at least 1px
        if (distance) {
            // if the first tile in the active row has moved to the right
            if (firstTile.x > 0) {
                this.loopRowRight()
            }

            // else if the last tile has moved to a position less than the stage width
            else if (firstTile.x < (SIZE - firstTile.width)) {
                this.loopRowLeft()
            }

            this.tiles.x[row].forEach(tile => {
                tile.position.x += distance
            })
        }

        this.distanceCache = distance
    }

    /**
     * move offscreen pieces in a negative X direction if the first tile
     * on the X axis is at a position greater than 0
     */
    loopRowRight () {
        const onScreenSlice = this.tiles.x[this.activeRow].splice(0, 3)
        let offScreenSlice = this.tiles.x[this.activeRow]

        // create slice of offscreen tiles
        offScreenSlice = offScreenSlice.reduce((reversed, item) => {
            reversed.unshift(item)
            return reversed
        }, [])

        offScreenSlice.forEach(tile => this.moveByUnit(tile, -12))
        this.tiles.x[this.activeRow] = offScreenSlice.concat(onScreenSlice)
    }

    /**
     * helper function to print row coordinates of all tiles
     */
    getRowCoords (row) {
        return this.tiles.x[row].reduce((output, tile) => {
            output += `[${tile.coords.x}:${tile.coords.y}]`
            return output
        }, '')
    }

    /**
     * Helper function to print a tile's coordinates and position
     */
    getTileInfo (tile) {
        return `[x: ${tile.coords.x}, y: ${tile.coords.y}] [pos: ${this.getUnit(tile.position.x)}]`
    }

    /**
     * convert a pixel distance to a 'unit' distance, a unit is
     * a representation of 1 tile's width
     */
    getUnitFromPixel (distance) {
        return Math.round(distance / UNIT)
    }

    /**
     * convert a unit distance to a pixel value
     */
    getPixelFromUnit (distance) {
        return Math.round(distance * UNIT)
    }

    /**
     * move a single tile by a given unit value, e.g. move tile
     * by 3 tiles
     */
    moveByUnit (tile, distance) {
        tile.position.x += this.getPixelFromUnit(distance)
    }
}
