let canvas
let ctx
let xTranslate
let yTranslate
let fourier

class FourierSeries {
    constructor(initArgs) {
        this.amp = initArgs.amp
        this.lambda = initArgs.lambda
        this.freq = initArgs.freq
        this.harmonics = initArgs.n
        this.reset()
    }

    draw() {
        this.t += 1
        if (this.t == 360) {
            this.reset()
        }

        for (let x = 0; x < xTranslate; x++) {
            let y = 0
            for (let n = 1; n <= this.harmonics; n++) {
                y += Math.sin(
                    (2 * n - 1) * 2 * Math.PI * (this.freq * this.t / 180 + x / this.lambda)
                ) / (2 * n - 1)
            }
            y = -this.amp * y
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    xTranslate = Math.floor(canvas.width / 2)
    yTranslate = Math.floor(canvas.height / 2)

    fourier = new FourierSeries({
        amp: 100,
        lambda: xTranslate / 4,
        n: 4,
        freq: 1
    })

    setInterval(draw, 32) // 1 / 30th of a second refresh
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)
    fourier.draw()
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
