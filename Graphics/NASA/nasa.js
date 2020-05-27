let canvas
let ctx
let orbiter
let textHeight

class Orbiter {
    constructor() {
        let n = 400
        let r = 20
        this.rs = Array(n)
        for (let i = 0; i < n; i++) {
            this.rs[i] = r
            if (i % 20 == 0) {
                r--
            }
        }
        this.theta = 0
        this.a = 480
        this.b = 240
    }
    
    draw() {
        let theta = this.theta
        for (let i = 0; i < this.rs.length; i++) {
            let thetaRad = theta * Math.PI / 180
            let x = Math.floor(canvas.width / 2 + this.a * Math.cos(thetaRad))
            let y = Math.floor(canvas.height / 2 - this.b * Math.sin(thetaRad))
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(x, y, this.rs[i], 0, 2 * Math.PI)
            ctx.fill()
            theta -= .5
        }
    }

    move() {
        this.theta += 8
        if (this.theta >= 360) {
            this.theta = this.theta % 360
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    orbiter = new Orbiter()

    setInterval(draw, 128)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(8, 8, 127)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    textHeight = 200
    ctx.font = '' + textHeight + 'px Serif'
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.fillText("NASA", 240, 400)

    orbiter.move()
    orbiter.draw()
}

function randInt(min, max) {
    return Math.floor(Math.round(Math.random() * (max - min)) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
