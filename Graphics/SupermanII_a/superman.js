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
        this.zoomEndFont = 40
        this.stillDelay = 64
        this.dir = [-1, 1]
        this.selIdx = this.texts.length
        this.reset()
    }

    reset() {
        this.stage = 1
        this.fontSize = 1
        this.selIdx++
        if (this.selIdx >= this.texts.length) {
            this.selIdx = 0
        }
        this.text = this.texts[this.selIdx]
        this.ydir = this.dir[randInt(0, 1)]
    }

    draw() {
        let baseFont = 'bold ' + this.fontSize + 'px Arial'
        ctx.font = baseFont
        let textSize = ctx.measureText(this.text)
        let x = Math.floor(.5 * canvas.width - textSize.width / 2)
        let y = Math.floor(.5 * canvas.height - (textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent) / 2)

        if (this.stage <= 2) {
            let i = 0
            while (i < 20) {
                ctx.font = '' + (this.fontSize - i) + 'px Arial'
                textSize = ctx.measureText(this.text)
                let xshadow = Math.floor(.5 * canvas.width - textSize.width / 2)
                let yshadow = y + ((this.ydir < 0) ? (2 * i * this.ydir) : (1.5 * i * this.ydir))
                ctx.strokeStyle = rgbToHex(0, 0, 255)
                ctx.lineWidth = 1
                ctx.strokeText(this.text, xshadow, yshadow)
                i += .5
            }
        }

        ctx.font = baseFont
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.fillText(this.text, x, y)

        if (this.stage == 3) {
            ctx.fillStyle = rgbToHex(0, 0, 0)
            ctx.fillText(this.text, x, y)
            ctx.strokeStyle = rgbToHex(0, 0, 255)
            let i = 0
            while (i < this.superZoomCount) {
                ctx.font = '' + (2*i + this.fontSize) + 'px Arial'
                ctx.lineWidth = 1
                textSize = ctx.measureText(this.text)
                x = Math.floor(.5 * canvas.width - textSize.width / 2)
                y += 2 * this.ydir
                ctx.strokeText(this.text, x, y)                
                i += 1
            }
            ctx.font = 'bold' + (2 * i + this.fontSize) + 'px Arial'
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.fillText(this.text, x, y)
        }
    }

    zoom() {
        if (this.stage == 1) {
            if (this.fontSize < this.zoomEndFont) {
                this.fontSize++
            }
            else {
                this.stage++                
                this.stillCount = 0
            }
            return
        }

        if (this.stage == 2) {
            if (this.stillCount < this.stillDelay) {
                this.stillCount++
            }
            else {
                this.stage++
                this.superZoomCount = 0
            }
            return
        }

        if (this.stage == 3) {
            if (this.superZoomCount < 64) {
                this.superZoomCount++
            }
            else {
                this.reset()
            }
        }
    }
}

class Star {
    constructor(initArgs) {
        this.reset()
        this.R = randInt(20, maxx)
    }

    reset() {
        this.theta = (randInt(0, 1)) ? randInt(-80, 80) : randInt(110, 260)
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

    superman.draw()
    superman.zoom()

    ctx.translate(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))
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
