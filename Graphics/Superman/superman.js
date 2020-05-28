let canvas
let ctx
let superman

class Superman {
    constructor(initArgs) {
        this.texts = [
            'ALEXANDER SALKIND PRESENTS',
            'MARLON BRANDO',
            'GENE HACKMAN',
            'A RICHARD DONNER FILM',
            'SUPERMAN',
            'CHRISTOPHER REEVE',
            'NED BEATTY',
            'JACKIE COOPER',
            'GLENN FORD',
            'TREVOR HOWARD',
            'MARGOT KIDDER',
            'JACK O HALLORAN',
            'VALERIE PERRINE',
            'MARIA SCHELL',
            'JEFF EAST',
            'MUSIC BY JOHN WILLIAMS',
            'EXECUTIVE PRODUCER ILYA SALKIND',
            'PRODUCED BY PIERRE SPENGLER',
            'DIRECTED BY RICHARD DONNER'
        ]
        this.ydir = [-1, 1]
        this.selIdx = this.texts.length
        this.reset()
    }

    reset() {
        this.dy = 20 * this.ydir[randInt(0, 1)]
        this.maxHeight = 200
        this.selIdx++
        if (this.selIdx >= this.texts.length) {
            this.selIdx = 0
        }
        this.text = this.texts[this.selIdx]
    }

    draw() {
        ctx.strokeStyle = rgbToHex(0, 0, 255)
        ctx.strokeWeight = 10
        let x = Math.floor(canvas.width / 2 - 40 * this.text.length / 3)
        let y = Math.floor(canvas.height / 2 - 40)
        for (let i = 40; i < this.maxHeight; i += 5) {
            x -= 20
            y += this.dy
            ctx.font = 'bold ' + i + 'px arial'
            ctx.strokeText(this.text, x, y)
        }
    }

    fade() {
        this.maxHeight -= 5
        if (this.maxHeight < 40) {
            this.reset()
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    superman = new Superman()
    setInterval(draw, 16)
}

function draw() {
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    superman.draw()
    superman.fade()
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
