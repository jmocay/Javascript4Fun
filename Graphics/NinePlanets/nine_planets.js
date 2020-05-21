let canvas
let ctx
let xTranslate
let yTranslate
let planets

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    let width = canvas.width
    let height = canvas.height

    xTranslate = Math.floor(width / 2)
    yTranslate = Math.floor(height / 2)

    planets = []
    planets.push(new Planet({
            a: Math.floor(width / 4),
            b: Math.floor(height / 4),
            speed:1,
            d: 5,
        })
    )  // pluto
    planets.push(new Planet({
            a: Math.floor(width / 5),
            b: Math.floor(height / 5),
            speed: 2,
            d: 8,
        })
    )  // uranus
    planets.push(new Planet({
            a: Math.floor(width / 6),
            b: Math.floor(height / 6),
            speed: 3,
            d: 9,
        })
    )  // neptune
    planets.push(new Planet({
            a: Math.floor(width / 7),
            b: Math.floor(height / 7),
            speed: 4,
            d: 20,
        })
    ) // jupiter
    planets.push(new Planet({
            a: Math.floor(width / 8),
            b: Math.floor(height / 8),
            speed: 5,
            d: 16,
        })
    ) // saturn
    planets.push(new Planet({
            a: Math.floor(width / 9),
            b: Math.floor(height / 9),
            speed: 6,
            d: 12,
        })
    ) // mars
    planets.push(new Planet({
            a: Math.floor(width / 10),
            b: Math.floor(height / 10),
            speed: 7,
            d: 10,
        })
    ) // earth
    planets.push(new Planet({
            a: Math.floor(width / 11),
            b: Math.floor(height / 11),
            speed: 8,
            d: 8,
        })
    ) // venus
    planets.push(new Planet({
            a: Math.floor(width / 12),
            b: Math.floor(height / 12),
            speed: 9,
            d: 5,
        })
    ) // mercury

    setInterval(draw, 32)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)

    // sun
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(0, 0, 24, 0, 2 * Math.PI)
    ctx.fill()

    for (let planet of planets) {
        planet.move()
        planet.draw()
    }
}

function Planet(initArgs) {
    this.a = initArgs.a                  // orbit major axis
    this.b = initArgs.b                  // orbit minor axis
    this.speed = initArgs.speed          // degrees per refresh
    this.r = Math.floor(initArgs.d / 2)  // diameter
    this.theta = 0                       // current orbital angle
}

Planet.prototype.move = function () {
    this.theta += this.speed
    if (this.theta == 360) {
        this.theta = 0
    }
    let thetaRad = this.theta * Math.PI / 180
    this.x = Math.floor(this.a * Math.cos(thetaRad))
    this.y = Math.floor(this.b * Math.sin(thetaRad))
}

Planet.prototype.draw = function () {
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
