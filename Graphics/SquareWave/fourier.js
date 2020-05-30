let canvas
let ctx
let xTranslate
let yTranslate
let armature
let fourier

class FourierSeries {
    constructor(initArgs) {
        this.amp = initArgs.amp
        this.lambda = initArgs.lambda
        this.freq = initArgs.freq
        this.harmonics = initArgs.n
        this.t = 0
    }

    draw() {
        this.t += 1
        if (this.t == 360) {
            this.t = 0
        }

        for (let x = 0; x < xTranslate; x++) {
            let y = 0
            for (let n = 1; n <= this.harmonics; n++) {
                y += -Math.sin(
                    (2 * n - 1) * 2 * Math.PI * (this.freq * this.t / 180 + x / this.lambda)
                ) / (2 * n - 1)
            }
            y = this.amp * y
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}

class Armature {
    constructor(initArgs) {
        this.amp = initArgs.amp
        this.freq = initArgs.freq
        this.harmonics = initArgs.n
        this.t = 0
    }

    draw() {
        this.t += 1
        if (this.t == 360) {
            this.reset()
        }

        let xOffset = xTranslate / 2
        let x0 = 0
        let y0 = 0
        let tipX, tipY
        for (let n = 1; n <= this.harmonics; n++) {
            let r = this.amp / (2 * n - 1)
            let x = r * Math.cos(
                (2 * n - 1) * 2 * Math.PI * this.freq * this.t / 180
            )
            let y = -r * Math.sin(
                (2 * n - 1) * 2 * Math.PI * this.freq * this.t / 180
            )

            ctx.strokeStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(x0 - xOffset, y0, r, 0, 2 * Math.PI)
            ctx.stroke()

            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            tipX = x0 + x - xOffset
            tipY = y0 + y
            ctx.arc(tipX, tipY, 3, 0, 2 * Math.PI)
            ctx.fill()

            x0 = x
            y0 = y
        }

        return {
            x: tipX,
            y: tipY
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
        lambda: xTranslate,
        n: 2,
        freq: 1
    })

    armature = new Armature({
        amp: 100,
        n: 2,
        freq: 1
    })

    setInterval(draw, 32) // 1 / 30th of a second refresh
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)

    let armTip = armature.draw()
    fourier.draw()
    ctx.strokeStyle = rgbToHex(128, 128, 128)
    ctx.beginPath()
    ctx.moveTo(armTip.x, armTip.y)
    ctx.lineTo(0, armTip.y)
    ctx.stroke()
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
