let canvas
let ctx
let walker

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

class RandomWalker {

    constructor() {
        this.dx = [-5, 0, 5]
        this.dy = [-5, 0, 5]
        this.reset()
    }

    reset() {
        this.x = Math.floor(canvas.width * Math.random())
        this.y = Math.floor(canvas.height * Math.random())
    }

    draw() {
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        this.x += this.dx[Math.floor(3 * Math.random())]
        this.y += this.dy[Math.floor(3 * Math.random())]
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset()
        }
    }

    walk() {
        this.move()
        this.draw()
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    walker = new RandomWalker()

    setInterval(draw, 16)
}

function draw() {
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    walker.walk()
}

window.addEventListener('load', init)
