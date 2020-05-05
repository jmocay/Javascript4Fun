const XMIN = -512
const XMAX = 512
const YMIN = -384
const YMAX = 384
const ZMIN = 0
const ZMAX = 512

var canvas
var ctx
var xTranslate
var yTranslate
var stars

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = XMAX - XMIN
    canvas.height = YMAX - YMIN
    ctx = canvas.getContext("2d")

    let width = canvas.width
    let height = canvas.height

    xTranslate = Math.floor(width / 2)
    yTranslate = Math.floor(height / 2)

    let n = 64 + Math.floor(64 * Math.random())

    stars = []
    for (let i = 0; i < n; i++) {
        stars.push(new Star())
    }

    setInterval(draw, 32)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)

    for (let star of stars) {
        star.draw()
        star.move()
    }
}

function Star() {
    let width = canvas.width
    let height = canvas.height
    this.reset()
    this.rad = Math.floor(Math.sqrt(width / 2) + Math.sqrt(height / 2))
    this.x = Math.floor(this.rad * Math.cos(this.theta))
    this.y = Math.floor(this.rad * Math.sin(this.theta))
}

Star.prototype.reset = function() {
    this.rad = 0
    this.theta = 2 * Math.PI * Math.random()
    this.x = 0; this.y = 0; this.z = 0
    this.xprev = 0; this.yprev = 0
    this.speed = 1 + Math.floor(5 * Math.random())
    this.twist = -1 + Math.floor(2 * Math.random())
    this.twist = 0
    this.r = 255; this.g = 255; this.b = 255
}

Star.prototype.move = function() {
    this.speed += 1
    this.rad += this.speed / 5
    this.theta += this.twist * Math.PI / 180
    this.xprev = this.x; this.yprev = this.y
    this.x = Math.floor(this.rad * Math.cos(this.theta))
    this.y = Math.floor(this.rad * Math.sin(this.theta))
    this.z += this.speed / 5
    if (this.x < XMIN || this.x > XMAX || this.y < YMIN || this.y > YMAX) {
        this.reset()
    }
}

Star.prototype.draw = function() {
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.z * 5 / (ZMAX - ZMIN), 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.xprev, this.yprev)
    ctx.stroke()
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
