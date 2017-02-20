import 'pixi.js'
import { getColorByKey } from '../helpers/colors'
import { UNIT, GUTTER, BORDER_RADIUS } from '../helpers/globals'

const { Graphics } = PIXI

export default class Tile extends Graphics {
    constructor (color, x, y) {
        super()
        this.interactive = true
        this.color = color
        this.coords = { x, y }

        this.beginFill(getColorByKey('white'))
        this.drawRect(0, 0, UNIT, UNIT)
        this.endFill()

        this.beginFill(color)
        this.drawRoundedRect(GUTTER, GUTTER, UNIT - GUTTER, UNIT - GUTTER, BORDER_RADIUS)
        this.endFill()

        this.position.set(x * UNIT, y * UNIT)

        this.mouseCache = { x: 0, y: 0 }
        this.active = false
        this.over = false
    }

    click () {
        if (!this.active) {
            if (this.x > (SIZE / 2)) {
                this.parent.shiftRow(this.coords.y, -1)
            }
            else this.parent.shiftRow(this.coords.y, 1)
        }
    }

    dragging (x, y) {
        const distance = x - this.mouseCache.x
        this.parent.moveRow(this.coords.y, Math.round(distance))
        this.mouseCache.x = x
    }

    pointerover () {
        this.over = true
    }

    pointerout () {
        this.over = false
    }

    pointerdown (event) {
        this.active = true
    }

    pointerup (event) {
        this.active = false
    }

    mousemove (event) {
        const { x, y } = event.data.global
        if (!this.active && this.over) {
            this.mouseCache = { x, y }
        }
    }

    pointermove (event) {
        const { x, y } = event.data.global
        if (this.active) {
            this.dragging(x, y)
        }
    }

    pointerupoutside () {
        this.active = false
    }
}
