var canvas
var ctx
var polySticks

function randInt(min, max) {
    return Math.Math.floor(Math.random() * (max - min) + min)
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
    polySticks = new PolySticks()
    setInterval(draw, 32)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    polySticks.move()
    polySticks.draw()
}

function PolySticks() {
    this.vertices = []
    let n = Math.floor(3 + 20 * Math.random())
    for (let i = 0; i < n; i++) {
        this.vertices.push(new Vertex({
            x: Math.floor(canvas.width * Math.random()),
            y: Math.floor(canvas.height * Math.random()),
            dx: Math.floor(1 + 5 * Math.random()),
            dy: Math.floor(1 + 5 * Math.random()),
            color: {
                r: Math.floor(128 + 127 * Math.random()),
                g: Math.floor(128 + 127 * Math.random()),
                b: Math.floor(128 + 127 * Math.random())
            }
        }))
    }
}

PolySticks.prototype.draw = function () {
    let color
    ctx.strokeWeight = 3
    ctx.strokeStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.moveTo(this.vertices[0].x, this.vertices[0].y)
    for (let i = 1; i < this.vertices.length; i++) {
        color = this.vertices[i].color
        ctx.strokeStyle = rgbToHex(color.r, color.g, color.b)
        ctx.lineTo(this.vertices[i].x, this.vertices[i].y)
    }
    color = this.vertices[0].color
    ctx.strokeStyle = rgbToHex(color.r, color.g, color.b)
    ctx.lineTo(this.vertices[0].x, this.vertices[0].y)
    ctx.stroke()
}

PolySticks.prototype.move = function () {
    this.vertices.forEach(v => v.move())
}

function Vertex(initArgs) {
    this.x = initArgs.x
    this.y = initArgs.y
    this.dx = initArgs.dx
    this.dy = initArgs.dy
    this.color = initArgs.color
    this.theta = Math.floor(360 * Math.random())
}

Vertex.prototype.move = function () {
    this.x += this.dx
    this.y += this.dy

    if (this.x < 0) {
        this.x = 0
        this.dx = Math.floor(1 + 5 * Math.random())
    }
    else if (this.x >= canvas.width) {
        this.x = canvas.width - 1
        this.dx = -Math.floor(1 + 5 * Math.random())
    }

    if (this.y < 0) {
        this.y = 0
        this.dy = Math.floor(1 + 5 * Math.random())
    }
    else if (this.y >= canvas.height) {
        this.y = canvas.height - 1
        this.dy = -Math.floor(1 + 5 * Math.random())
    }
}

window.addEventListener('load', init)
