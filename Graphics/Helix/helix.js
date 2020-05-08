const COLORS = [
    rgbToHex(255, 0, 0),
    rgbToHex(0, 255, 0),
    rgbToHex(0, 0, 255),
    rgbToHex(255, 255, 0)
]
var canvas
var ctx
var helix
var phi

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

class Ball {
    constructor(initArgs) {
        this.x0 = initArgs.x0
        this.y0 = initArgs.y0
        this.z = initArgs.z
        this.a = initArgs.a
        this.b = initArgs.b
        this.r = initArgs.r
        this.theta = initArgs.theta
        this.fillStyle = initArgs.fillStyle
    }

    draw() {
        let thetaRad = this.theta * Math.PI / 180
        let x = this.x0 + this.a * Math.cos(thetaRad)
        let y = this.y0 + this.b * Math.sin(thetaRad)
        ctx.fillStyle = this.fillStyle
        ctx.beginPath()
        ctx.arc(x, Math.floor((y + this.z / 3) * Math.cos(phi)),
                this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        this.theta++
        if (this.theta == 360) {
            this.theta = 0
        }
    }
}

class Helix {
    constructor(initArgs) {
        this.x0 = initArgs.x0
        this.y0 = initArgs.y0
        this.z0 = initArgs.z0
        this.a = initArgs.a
        this.b = initArgs.b
        this.balls = []
        this.theta = 0

        let turns = initArgs.turns

        let n = randInt(164, 200)
        let r = 20
        for (let i = 0; i < n; i++) {
            this.balls.push(
                new Ball({
                    x0: this.x0,
                    y0: this.y0,
                    z: i * r,
                    a: this.a,
                    b: this.b,
                    r: r,
                    theta: Math.floor(i * turns * 360 / n),
                    fillStyle: COLORS[Math.floor(4 * Math.random())]
                })
            )
        }
    }

    draw() {
        this.balls.forEach(ball => ball.draw())
    }

    move() {
        this.balls.forEach(ball => ball.move())
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    phi = Math.PI / 3

    helix = new Helix({
        x0: Math.floor(canvas.width / 2),
        y0: Math.floor(canvas.height / 4),
        z0: 0,
        a: Math.floor(canvas.width / 5),
        b: 100,
        turns: 5
    })

    setInterval(draw, 16)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    helix.move()
    helix.draw()
}

window.addEventListener('load', init)
