var canvas
var ctx
var balls

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
        this.r = initArgs.r
        this.color = initArgs.color
        this.xdir = randInt(4, 8)
        this.ydir = randInt(4, 8)
    }

    draw() {
        var grad = ctx.createRadialGradient(this.x, this.y, Math.floor(this.r / 3), this.x, this.y, this.r)
        grad.addColorStop(0, this.color)
        grad.addColorStop(1, "black")
        // grad.addColorStop(0, "white")
        // grad.addColorStop(1, rgbToHex(0, 0, 200))

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    moveX () {
        let x = this.x + this.xdir
        if (x < 0 || x >= canvas.width) {
            this.xdir = -this.xdir
        }
        this.x += this.xdir
    }

    moveY() {
        let y = this.y + this.ydir
        if (y < 0 || y >= canvas.height) {
            this.ydir = -this.ydir
        }
        this.y += this.ydir
    }

    move() {
        this.moveX()
        this.moveY()
    }
}


function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    let n = randInt(40, 80)
    balls = []
    for (let i = 0; i < n; i++) {
        balls.push(
            new Ball({
                x: randInt(0, canvas.width - 1),
                y: randInt(0, canvas.height - 1),
                r: randInt(20, 40),
                color: rgbToHex(
                    randInt(128, 255),
                    randInt(128, 255),
                    randInt(128, 255)
                )
            })
        )
    }

    setInterval(draw, 16)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    balls.forEach(ball => {
        ball.move()
        ball.draw()
    })
}

window.addEventListener('load', init)
