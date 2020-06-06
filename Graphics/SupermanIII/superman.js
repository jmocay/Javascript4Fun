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
        this.credits = []
        this.fontSize = 50
        this.selIdx = this.texts.length
        this.reset()
    }

    reset() {
        this.selIdx++
        if (this.selIdx >= this.texts.length) {
            this.selIdx = 0
        }
        let text = this.texts[this.selIdx]
        ctx.font = 'bold ' + this.fontSize + 'px Arial'
        let textMetrics = ctx.measureText(text)
        this.credits.push({
            text: text,
            x: -textMetrics.width / 2,
            y: canvas.height / 2
        })
    }

    draw() {
        this.credits.forEach(credit => {
            let shdwFontSize = this.fontSize
            let dy = -2 * credit.y / (canvas.height / 2)
            for (let i=0; i<40; i++) {
                ctx.font = '' + shdwFontSize + 'px Arial'
                let textMetrics = ctx.measureText(credit.text)
                ctx.strokeStyle = rgbToHex(0, 0, 255)
                ctx.strokeText(credit.text, -textMetrics.width / 2, credit.y + i*dy)
                shdwFontSize--
            }

            ctx.font = 'bold ' + this.fontSize + 'px Arial'
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.fillText(credit.text, credit.x, credit.y)
        })
    }

    scroll() {
        this.credits.forEach(credit => {
            credit.y -= 3
            if (credit.y < -canvas.height / 2) {
                this.credits.shift()
                this.reset()
            }
        })
    }
}

class Star {
    constructor(initArgs) {
        this.reset()
        this.R = randInt(80, maxx)
    }

    reset() {
        this.theta = (randInt(0, 1)) ? randInt(-80, 80) : randInt(110, 260)
        this.speed = randInt(1, 3)
        this.r = .5 * randInt(1, 4)
        this.R = randInt(80, 200)
        this.color = rgbToHex(255, 255, 255)
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        let thetaRad = this.theta * Math.PI / 180
        this.x = this.R * Math.cos(thetaRad)
        this.y = -this.R * Math.sin(thetaRad)
        this.R += this.speed
        this.speed += .15
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

    let n = randInt(64, 128)
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

    superman.draw()
    superman.scroll()

    stars.forEach(star => {
        star.move()
        star.draw()
    })
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
