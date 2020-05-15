var canvas
var ctx
var theta

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

class Ball {
    constructor(initArgs) {
        this.x = initArgs.x
        this.y = initArgs.y
        this.z = initArgs.y
        this.r = initArgs.r
        this.color = initArgs.color
        this.R = randInt(100, 200)
        this.theta = 0
        this.dz = 5
    }

    draw() {
        let x = Math.floor(canvas.width / 2) + this.x
        let y = Math.floor(canvas.height / 2) - (this.y * Math.cos(theta) + this.z * Math.sin(theta))
        var grad = ctx.createRadialGradient(x, y, Math.floor(this.r / 3), x, y, this.r)
        grad.addColorStop(0, this.color)
        grad.addColorStop(1, "black")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        this.theta += 1
        if (this.theta == 360) {
            this.theta = 0
        }
        let thetaRad = this.theta * Math.PI / 180
        this.x = this.R * Math.cos(thetaRad)
        this.y = this.R * Math.sin(thetaRad)
        if (this.z < -360 || this.z > 360) {
            this.dz = -this.dz
        }
        this.z += this.dz
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    theta = Math.PI / 3

    ball = new Ball({
        x: 0,
        y: 0,
        z: 0,
        r: randInt(10, 20),
        color: rgbToHex(0, 255, 0)
    })

    setInterval(draw, 16)
}

function draw() {
    ball.move()
    ball.draw()
}

window.addEventListener('load', init)
