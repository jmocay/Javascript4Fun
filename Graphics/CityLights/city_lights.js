var minX
var minY
var maxX
var maxY

function CityLights() {
    minX = 0
    maxX = canvas.width - 1
    minY = 0
    maxY = canvas.height - 1

    let n = Math.floor(128 + 128 * Math.random())
    this.lights = []
    for (let i = 0; i < n; i++) {
        this.lights.push(new Light())
    }
}

CityLights.prototype.draw = function() {
    this.lights.forEach(light => light.draw())
}

CityLights.prototype.move = function() {
    this.lights.forEach(light => light.move(this.d, this.theta))
}

var dirChoice = [
    Math.PI / 6, Math.PI / 2, 5 * Math.PI / 6
]

function Light() {
    this.reset()
}

Light.prototype.reset = function() {
    let d = 4 + Math.floor(4 * Math.random())
    let i = Math.floor(3 * Math.random())
    let theta = dirChoice[i]
    if (i == 0) {
        if (Math.floor(2 * Math.random()) == 0) {
            this.x = canvas.width - 1
            this.y = Math.floor(canvas.height * Math.random())
        }
        else {
            this.x = Math.floor(canvas.height * Math.random())
            this.y = canvas.height
        }
    }
    else if (i == 1) {
        this.x = Math.floor(canvas.width * Math.random())
        this.y = maxY
    }
    else {
        if (Math.floor(2 * Math.random()) == 0) {
            this.x = 0
            this.y = Math.floor(canvas.height * Math.random())
        }
        else {
            this.x = Math.floor(canvas.height * Math.random())
            this.y = canvas.height
        }
    }
    this.r = 2 + Math.floor(2 * Math.random())
    this.dx = d * Math.cos(theta)
    this.dy = d * Math.sin(theta)
    this.xprev = this.x
    this.yprev = this.y
}

Light.prototype.draw = function() {
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()

    ctx.strokeStyle = rgbToHex(255, 255, 255)
    ctx.strokeWeight = 1
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.xprev, this.yprev)
    ctx.stroke()
}

Light.prototype.move = function (d, theta) {
    this.x -= this.dx
    this.y -= this.dy
    if (this.x < minX || this.x > maxX || this.y < minY || this.y > maxY) {
        this.reset()
    }
}
