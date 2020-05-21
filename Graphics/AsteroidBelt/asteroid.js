let canvas
let ctx
let asteroidBelt
let xTranslate
let yTranslate

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

class Asteroid {
    constructor(initArgs) {
        this.a = initArgs.a + randInt(-10, 10)
        this.bMax = initArgs.b + randInt(-10, 10)
        this.b = this.bMax
        this.db = 1
        this.r = randInt(4, 8)
        this.dtheta = randInt(1, 4)
        this.theta = randInt(0, 360)
    }

    draw() {
        let thetaRad = this.theta * Math.PI / 180
        this.x = Math.floor(this.a * Math.cos(thetaRad))
        this.y = Math.floor(this.b * Math.sin(thetaRad))
        ctx.fillStyle = rgbToHex(165, 84, 84)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        this.theta += this.dtheta
        if (this.theta >= 360) {
            this.theta = 0
        }

        if (this.db > 0) {
            if (this.b + this.db > this.bMax) {
                this.db *= -1
            }
            this.b += this.db
        }
        else {
            if (this.b + this.db < 0) {
                this.db *= -1
            }
            this.b += this.db
        }
    }
}

class AsteroidBelt {

    constructor(initArgs) {
        this.a = initArgs.a
        this.b = initArgs.b
        this.tilt = 0
        // Setup asteroids
        this.asteroids = []
        let n = randInt(32, 96)
        for (let i = 0; i < n; i++) {
            this.asteroids.push(
                new Asteroid({
                    a: this.a,
                    b: this.b,
                })
            )
        }
    }

    draw() {
        this.tilt++
        if (this.tilt > 360) {
            this.tilt = 0
        }
        ctx.rotate(this.tilt * Math.PI / 180)
        for (let asteroid of this.asteroids) {
            asteroid.draw()
        }
    }

    move() {
        for (let asteroid of this.asteroids) {
            asteroid.move()
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

    asteroidBelt = new AsteroidBelt({
        a: Math.floor(canvas.width / 4),
        b: Math.floor(canvas.height / 4)
    })

    setInterval(draw, 32);
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)

    asteroidBelt.move()
    asteroidBelt.draw()
}

window.addEventListener('load', init)