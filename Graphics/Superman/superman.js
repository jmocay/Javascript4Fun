let canvas
let ctx
let superman
let stars
let minx
let maxx
let miny
let maxy

class Superman {
    constructor(initArgs) {
        this.texts = [
            "ALEXANDER SALKIND PRESENTS",
            "MARLON BRANDO",
            "GENE HACKMAN",
            "A RICHARD DONNER FILM",
            "SUPERMAN",
            "CHRISTOPHER REEVE",
            "NED BEATTY",
            "JACKIE COOPER",
            "GLENN FORD",
            "TREVOR HOWARD",
            "MARGOT KIDDER",
            "JACK O'HALLORAN",
            "VALERIE PERRINE",
            "MARIA SCHELL",
            "TERENCE STAMP",
            "PHYLLIS THAXTER",
            "SUSANNAH YORK",
            "JEFF EAST",
            "MARC McCLURE",
            "SARAH DOUGLAS",
            "MUSIC BY JOHN WILLIAMS",
            "CREATED BY JERRY SIEGEL and JOE SHUSTER",
            "SCREENPLAY BY MARIO PUZO",
            "CREATIVE CONSULTANT TOM MANKIEWICZ",
            "PHOTOGRAPHED BY GEOFFREY UNSWORTH",
            "SET DECORATION BY PETER HOWITT",
            "ASSOCIATE PRODUCER CHARLES GREENSLAW",
            "EXECUTIVE PRODUCER ILYA SALKIND",
            "PRODUCED BY PIERRE SPENGLER",
            "DIRECTED BY RICHARD DONNER"
        ]
        this.dir = [-1, 1]
        this.selIdx = this.texts.length
        this.reset()
    }

    reset() {
        this.dy = 4 * this.dir[randInt(0, 1)]
        this.theta = 10 * this.dir[randInt(0, 1)]
        this.dtheta = (this.theta < 0) ? 0.1 : -0.1
        this.maxHeight = 640
        this.selIdx++
        if (this.selIdx >= this.texts.length) {
            this.selIdx = 0
        }
        this.text = this.texts[this.selIdx]
    }

    draw() {
        this.theta += this.dtheta
        if (Math.abs(this.theta) < .5) {
            this.theta = 0
        }
        ctx.rotate(this.theta * Math.PI / 180)
        ctx.strokeStyle = rgbToHex(0, 0, 255)
        ctx.lineWidth = 1
        let x = Math.floor(-40 * this.text.length / 3)
        let y = Math.floor(-40)
        let i = 40
        for (; i < this.maxHeight; i += 2) {
            x -= 4
            y += this.dy
            ctx.font = "bold " + i + "px arial"
            ctx.strokeText(this.text, x, y)
        }
        ctx.fillStyle = rgbToHex(0, 0, 255)
        ctx.fillText(this.text, x, y)
        ctx.lineWidth = 4
        ctx.strokeStyle = rgbToHex(255, 255, 255)
        ctx.strokeText(this.text, x, y)
    }

    fade() {
        this.maxHeight -= 5
        if (this.maxHeight < 40) {
            this.reset()
        }
    }
}

class Star {
    constructor(initArgs) {
        this.reset()
        this.R = randInt(80, maxx)
    }

    reset() {
        this.theta = randInt(1, 360)
        this.speed = randInt(5, 10)
        this.r = randInt(1, 2)
        this.R = randInt(120, 200)
    }

    draw() {
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        let thetaRad = this.theta * Math.PI / 180
        this.x = this.R * Math.cos(thetaRad)
        this.y = -this.R * Math.sin(thetaRad)
        this.R += this.speed
        this.speed += .5
        if (this.x < minx || this.x > maxx || this.y < miny || this.y > maxy) {
            this.reset()
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    minx = -Math.floor(canvas.width / 2)
    maxx = Math.floor(canvas.width / 2)
    miny = -Math.floor(canvas.height / 2)
    maxy = Math.floor(canvas.height / 2)

    let n = randInt(40, 80)
    stars = Array(n)
    for (let i = 0; i < n; i++) {
        stars[i] = new Star({})
    }

    superman = new Superman()
    setInterval(draw, 16)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))

    stars.forEach(star => {
        star.move()
        star.draw()
    })

    superman.draw()
    superman.fade()
}

function randInt(min, max) {
    return Math.floor(Math.round(Math.random() * (max - min)) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, "0").toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener("load", init)
