var canvas
var ctx
var starField

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    starField = new Starfield()
    setInterval(draw, 32)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    starField.draw()
}

function Starfield() {
    this.d = 2 + Math.floor(Math.random())
    this.theta = 2 * Math.PI * Math.random()
    this.stars = []
    let n = Math.floor(128 + 128 * Math.random())
    for (let i = 0; i < n; i++) {
        this.stars.push(new Star())
    }
}

Starfield.prototype.draw = function () {
    for (let star of this.stars) {
        star.draw()
        star.move(this.d, this.theta)
    }
}

function Star() {
    this.resetX()
    this.resetY()
    this.resetDiameter()
}

Star.prototype.resetX = function () {
    this.x = Math.floor(canvas.width * Math.random())
}

Star.prototype.resetY = function () {
    this.y = Math.floor(canvas.height * Math.random())
}

Star.prototype.resetDiameter = function () {
    this.d = Math.floor(2 + 2 * Math.random())
}

Star.prototype.draw = function () {
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI)
    ctx.fill()
}

Star.prototype.move = function (d, theta) {
    this.x += Math.floor(d * Math.cos(theta))
    this.y += Math.floor(d * Math.sin(theta))

    if (this.x < 0) {
        this.x = canvas.width - 1
        this.resetY()
        this.resetDiameter()
    }
    else if (this.x >= canvas.width) {
        this.x = 0
        this.resetY()
        this.resetDiameter()
    }

    if (this.y < 0) {
        this.y = canvas.height - 1
        this.resetX()
        this.resetDiameter()
    }
    else if (this.y >= canvas.height) {
        this.y = 0
        this.resetX()
        this.resetDiameter()
    }
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
