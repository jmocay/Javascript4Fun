let canvas
let ctx
let stars
let meteors
let orbiter
let textHeight
let maxx
let maxy

class Orbiter {
    constructor(initArgs) {
        let n = initArgs.n
        let r = initArgs.r
        this.rs = Array(n)
        for (let i = 0; i < n; i++) {
            this.rs[i] = r
            if (i % 20 == 0) {
                r--
            }
        }
        this.theta = 0
        this.a = initArgs.a
        this.b = initArgs.b
    }
    
    draw() {
        ctx.translate(maxx, maxy)
        ctx.rotate(Math.PI / 4)
        let theta = this.theta
        for (let i = 0; i < this.rs.length; i++) {
            let thetaRad = theta * Math.PI / 180
            let x = Math.floor(this.a * Math.cos(thetaRad))
            let y = -Math.floor(this.b * Math.sin(thetaRad))
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(x, y, this.rs[i], 0, 2 * Math.PI)
            ctx.fill()
            theta -= .5
        }
    }

    move() {
        this.theta += 16
        if (this.theta >= 360) {
            this.theta = this.theta % 360
        }
    }
}

class Stars {
    constructor(initArgs) {
        let n = initArgs.n
        this.r = initArgs.r
        this.stars = Array(n)
        for (let i = 0; i < n; i++) {
            let r = randInt(Math.floor(this.r / 2), this.r)
            let thetaRad = randInt(1, 360) * Math.PI / 180
            this.stars[i] = {
                x: Math.floor(r * Math.cos(thetaRad)),
                y: Math.floor(r * Math.sin(thetaRad)),
                r: randInt(1, 2),
            }
        }
    }

    draw() {
        this.stars.forEach(star => {
            ctx.fillStyle = rgbToHex(255, 255, 255)
            ctx.beginPath()
            ctx.arc(Math.floor(maxx + star.x),
                    Math.floor(maxy - star.y),
                    star.r, 0, 2 * Math.PI)
            ctx.fill()
        })
    }
}

class Meteor {
    constructor(initArgs) {
        this.reset()
        this.R = randInt(0, maxy)
    }

    reset() {
        this.theta = randInt(1, 360)
        this.speed = randInt(5, 10)
        this.r = 1
        this.R = randInt(0, maxy)
    }

    draw() {
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.floor(this.r + 3 * this.r * this.R / maxy), 0, 2 * Math.PI)
        ctx.fill()
    }

    move() {
        let thetaRad = this.theta * Math.PI / 180
        this.x = Math.floor(maxx + this.R * Math.cos(thetaRad))
        this.y = Math.floor(maxy - this.R * Math.sin(thetaRad))
        this.R += this.speed
        if (this.R > maxy) {
            this.reset()
        }
        else {
            this.speed += 5
        }
    }
}

class MeteorField {
    constructor() {
        this.meteors = Array(randInt(80, 120))
        for (let i = 0; i < this.meteors.length; i++) {
            this.meteors[i] = new Meteor()
        }
    }

    draw() {
        this.meteors.forEach(meteor => meteor.draw())
    }

    move() {
        this.meteors.forEach(meteor => meteor.move())
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    maxx = Math.floor(canvas.width / 2)
    maxy = Math.floor(canvas.height / 2)

    stars = new Stars({
        n: 64,
        r: 360
    })

    meteors = new MeteorField()

    orbiter = new Orbiter({
        a: 360,
        b: 200,
        n: 400,
        r: 20,
    })

    setInterval(draw, 128)
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = rgbToHex(8, 8, 127)
    ctx.beginPath()
    let r = maxy
    ctx.arc(maxx, r, r, 0, 2 * Math.PI)
    ctx.fill()

    textHeight = 200
    ctx.font = '' + textHeight + 'px Serif'
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.fillText("NASA", 240, 420)

    stars.draw()

    meteors.move()
    meteors.draw()

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
