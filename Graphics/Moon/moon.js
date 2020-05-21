let canvas
let ctx
let planet

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    planet = new Planet({
        x: Math.floor(canvas.width / 2),
        y: Math.floor(canvas.height / 2),
        d: 8,
        a: Math.floor(canvas.width / 4),
        b: Math.floor(canvas.height / 4),
        v: 1
    })

    planet.addMoon(
        new Moon({
            x: planet.x + planet.a,
            y: parent.y + 0,
            d: 4,
            a: 32, b: 20,
            v: 4
        })
    )

    setInterval(draw, 16)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // sun
    ctx.fillStyle = rgbToHex(255, 255, 0)
    ctx.beginPath()
    ctx.arc(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 24, 0, 2 * Math.PI)
    ctx.fill()

    planet.move()
    planet.draw()
}

function ellipse(x, y, a, b, n) {
    if (!n)
        n = 360

    let theta  = 0
    let dtheta = 2 * Math.PI / n

    ctx.beginPath()
    ctx.moveTo(x + a, y)
    for (let i = 1; i <= n; i++) {
        theta += dtheta
        ctx.lineTo(
            x + a * Math.cos(theta),
            y + b * Math.sin(theta)
        )
    }
    ctx.stroke()
}

function Planet(initArgs) {
    this.ox = initArgs.x; // center x
    this.oy = initArgs.y; // center y
    this.d = initArgs.d;  // diameter
    this.a = initArgs.a;  // major axis
    this.b = initArgs.b;  // minor axis
    this.v = initArgs.v;  // speed
    this.moons = []
    this.theta = 0;
}

Planet.prototype.addMoon = function(moon) {
    this.moons.push(moon)
}

Planet.prototype.draw = function() {
    ctx.strokeWidth = 2
    ctx.strokeStyle = rgbToHex(0, 255, 0)
    ellipse(this.ox, this.oy, this.a, this.b)
    ctx.fillStyle = rgbToHex(0, 0, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
    ctx.fill()
    this.moons.forEach(moon => moon.draw())
}

Planet.prototype.move = function () {
    this.theta += this.v;
    if (this.theta >= 360) {
        this.theta = 0;
    }
    let thetaRad = this.theta * Math.PI / 180
    this.x = this.ox + Math.floor(this.a * Math.cos(thetaRad))
    this.y = this.oy + Math.floor(this.b * Math.sin(thetaRad))
    this.moons.forEach(moon => moon.move(this.x, this.y))
}

function Moon(initArgs) {
    this.ox = initArgs.x; // origin x
    this.oy = initArgs.y; // origin y
    this.d = initArgs.d;  // diameter
    this.a = initArgs.a;  // major axis
    this.b = initArgs.b;  // minor axis
    this.v = initArgs.v;  // speed
    this.theta = 0;
}

Moon.prototype.draw = function() {
    ctx.strokeStyle = rgbToHex(0, 255, 0)
    ellipse(this.ox, this.oy, this.a, this.b)
    ctx.fillStyle = rgbToHex(128, 128, 128)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
    ctx.fill()
}

Moon.prototype.move = function (x, y) {
    this.ox = x;
    this.oy = y;
    this.theta += this.v;
    if (this.theta >= 360) {
        this.theta = 0;
    }
    let thetaRad = this.theta * Math.PI / 180
    this.x = this.ox + Math.floor(this.a * Math.cos(thetaRad))
    this.y = this.oy + Math.floor(this.b * Math.sin(thetaRad))
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
