let canvas
let ctx
let stars
let minx
let maxx
let miny
let maxy

class Star {
    constructor(initArgs) {
        this.reset()
        this.R = randInt(20, maxx)
    }

    reset = () => {
        this.theta = (randInt(0, 1)) ? randInt(-80, 80) : randInt(110, 260)
        this.speed = randInt(5, 10)
        this.r = randInt(1, 2)
        this.R = randInt(40, 200)
    }

    draw = () => {
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
    }

    move = () => {
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

const init = () => {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    minx = -Math.floor(canvas.width / 2)
    maxx = Math.floor(canvas.width / 2)
    miny = -Math.floor(canvas.height / 2)
    maxy = Math.floor(canvas.height / 2)

    stars = createStars()

    setInterval(draw, 16)
}

const createStars = () => {
    let n = randInt(64, 128)
    let stars = Array(n)
    for (let i = 0; i < n; i++) {
        stars[i] = new Star({})
    }
    return stars 
}

const draw = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))

    stars.forEach(star => {
        star.move()
        star.draw()
    })
}

const randInt = (min, max) => {
    return Math.floor(Math.round(Math.random() * (max - min)) + min)
}

const toHex = (n) => {
    return n.toString(16).padStart(2, "0").toUpperCase()
}

const rgbToHex = (r, g, b) => {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener("load", init)
