import { randomRange } from './utils'

export const colors = {
    background: {
        black: '0x272727',
    },
    tiles: {
        green: '0x4CF172',
        orange: '0xFF822D',
        blue: '0x11A8FF',
        red: '0xEA394A',
        white: '0xffffff',
        yellow: '0xFFD900'
    }
}

/**
 * Return random color from colors.tiles
 */
export function getRandomTileColor (colors) {
    const keys = Object.keys(colors)
    return colors[keys[randomRange(0, keys.length - 1)]]
}

/**
 * Return color code by key
 * @param  {string} key
 * @return {string}
 */
export function getColorByKey (key) {
    if (colors.tiles[key]) return colors.tiles[key]
    else if (colors.background[key]) return colors.background[key]
    else throw new Error(`Could not find a colour with the key '${key}'`)
}

/**
 * Return tile color by index
 * @param  {number} index
 * @return {string}
 */
export function getTileColorByIndex (index) {
    const color = colors.tiles[Object.keys(colors.tiles)[index]]
    if (color) return color
    else throw new Error(`A color does not exists at index: ${index}`)
}
