let canvas
let ctx
let sweepers

class RadialSweep {

    constructor(initArgs) {
        this.reset()
        this.color = rgbToHex(255, 0, 0)
    }

    draw() {
        let grad = ctx.createRadialGradient(this.x, this.y, Math.floor(this.r / 3), this.x, this.y, this.r)
        grad.addColorStop(0, this.color)
        grad.addColorStop(1, "black")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()

        ctx.strokeStyle = this.color
        ctx.strokeWidth = 5
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        let thetaRad = this.theta * Math.PI / 180
        ctx.lineTo(this.x + Math.floor(canvas.width * Math.cos(thetaRad)),
            this.y - Math.floor(canvas.height * Math.sin(thetaRad)))
        ctx.stroke()
    }

    reset() {
        this.x = randInt(Math.floor(canvas.width / 8), Math.floor(7 * canvas.width / 8))
        this.y = randInt(Math.floor(canvas.height / 8), Math.floor(7 * canvas.height / 8))
        this.r = randInt(10, 20)
        this.itheta = randInt(1, 360)
        this.theta = this.itheta + 1
        this.rotations = 0
        this.maxRotations = randInt(1, 3)
    }

    sweep() {
        this.theta += 1
        if (this.theta % this.itheta == 0) {
            this.rotations += 1
        }
        if (this.rotations >= this.maxRotations) {
            this.reset()
        }
    }
}

function randInt(min, max) {
    return Math.floor(Math.round(Math.random() * (max - min)) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    let n = randInt(4, 8)
    sweepers = Array(n)
    for (let i = 0; i < n; i++) {
        sweepers[i] = new RadialSweep()
    }

    setInterval(draw, 16)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    sweepers.forEach(sweeper => {
        sweeper.sweep()
        sweeper.draw()
    })
}

window.addEventListener('load', init)
