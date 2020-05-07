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
        this.x = initArgs.x
        this.y = initArgs.y
        this.z = initArgs.z
        this.r = initArgs.r
        this.fillStyle = initArgs.fillStyle
    }

    draw() {
        ctx.fillStyle = this.fillStyle
        ctx.beginPath()
        ctx.arc(this.x,
                Math.floor(this.y * Math.cos(phi) + this.z * Math.cos(phi) / 3),
                this.r,
                0, 2 * Math.PI)
        ctx.fill()
    }
}

var colors = [
    rgbToHex(255, 0, 0),
    rgbToHex(0, 255, 0),
    rgbToHex(0, 0, 255),
    rgbToHex(255, 255, 0)
]

class Helix {
    constructor(initArgs) {
        this.a = initArgs.a
        this.b = initArgs.b
        this.x0 = initArgs.x
        this.y0 = initArgs.y
        this.z0 = initArgs.z
        this.balls = []
        this.theta = 0

        let turns = initArgs.turns

        let n = randInt(128, 256)
        let r = 20
        for (let i = 0; i < n; i++) {
            let theta = i * 2 * Math.PI * turns / n
            this.balls.push(
                new Ball({
                    x: this.x0 + Math.floor(this.a * Math.cos(theta)),
                    y: this.y0 + Math.floor(this.b * Math.sin(theta)),
                    z: this.z0 + i * r,
                    r: r,
                    fillStyle: colors[Math.floor(4 * Math.random())]
                })
            )
        }
    }

    draw() {
        this.balls.forEach(ball => ball.draw())
    }

    move() {
        this.theta++
        if (this.theta > 360) {
            this.theta = 0
        }
        let thetaRad = this.theta * Math.PI / 180
        let xpred = this.balls[0].x
        let ypred = this.balls[0].y
        let zpred = this.balls[0].z
        this.balls[0].x = this.x0 + Math.floor(this.a * Math.cos(thetaRad))
        this.balls[0].y = this.y0 - Math.floor(this.b * Math.sin(thetaRad))
        for (let i = 1; i < this.balls.length; i++) {
            let xsave = this.balls[i].x
            let ysave = this.balls[i].y
            let zsave = this.balls[i].z
            this.balls[i].x = xpred
            this.balls[i].y = ypred
            this.balls[i].z = zpred
            xpred = xsave
            ypred = ysave
            zpred = zsave
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    phi = Math.PI / 4 // 30 degrees

    helix = new Helix({
        a: Math.floor(canvas.width / 8),
        b: 100,
        x: Math.floor(canvas.width / 2),
        y: Math.floor(canvas.height / 4),
        z: 0,
        turns: 4
    })

    setInterval(draw, 32)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    helix.move()
    helix.draw()
}

window.addEventListener('load', init)
