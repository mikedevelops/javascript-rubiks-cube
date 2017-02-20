import 'pixi.js'

const { autoDetectRenderer, Container } = PIXI

export function renderer (width, height, background) {
    return new autoDetectRenderer(width, height, {
        backgroundColor: background,
        resolution: 2
    })
}

export function stage () {
    return new Container()
}
