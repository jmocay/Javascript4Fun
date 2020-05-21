let canvas
let ctx
let trees

function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

class Tree {
    constructor(initArgs) {
    }

    reset() {
        this.xbegin = randInt(0, canvas.width - 1)
        this.ybegin = canvas.height - 1
        this.r = randInt(Math.floor(canvas.height / 4), Math.floor(3 * canvas.height / 4))
        if (this.xbegin > Math.floor(canvas.width / 2)) {
            this.theta = randInt(91, 150)
        }
        else {
            this.theta = randInt(30, 90)
        }
    }

    draw() {
        this.reset()
        this.trunk()
        this.branch()
    }

    trunk() {
        let thetaRad = this.theta * Math.PI / 180
        this.xend = this.xbegin + Math.floor(this.r * Math.cos(thetaRad))
        this.yend = this.ybegin - Math.floor(this.r * Math.sin(thetaRad))
        ctx.strokeWidth = 5
        ctx.strokeStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.moveTo(this.xbegin, this.ybegin)
        ctx.lineTo(this.xend, this.yend)
        ctx.stroke()
    }

    branch() {
        this.branchHelper(this.xend, this.yend, this.r)
    }

    branchHelper(x, y, r) {
        let branchLength = Math.floor(r * randInt(1, 9) / 10)
        if (branchLength == 0) {
            return
        }
        let n = randInt(1, 4)
        for (let i = 0; i < n; i++) {
            let thetaRad = randInt(30, 150) * Math.PI / 180
            let xend = Math.floor(x + branchLength * Math.cos(thetaRad))
            let yend = Math.floor(y - branchLength * Math.sin(thetaRad))
            ctx.lineWidth = 3
            ctx.strokeStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(xend, yend)
            ctx.stroke()
            this.branchHelper(xend, yend, branchLength)
        }
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    let n = randInt(1, 10)
    trees = []
    for (let i = 0; i < n; i++) {
        trees.push(new Tree())
    }

    draw()

    setInterval(draw, 500)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    trees.forEach(tree => tree.draw())
}

window.addEventListener('load', init)
