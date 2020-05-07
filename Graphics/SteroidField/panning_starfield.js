var minX
var minY
var maxX
var maxY

function Starfield() {
    minX = 0
    maxX = canvas.width - 1
    minY = 0
    maxY = canvas.height - 1

    this.d = 1 + Math.floor(1 + 5 * Math.random())
    this.theta = 2 * Math.PI * Math.random()
    
    let n = Math.floor(1 + 128 * Math.random())
    this.stars = []
    for (let i = 0; i < n; i++) {
        this.stars.push(new Star())
    }
}

Starfield.prototype.draw = function() {
    this.stars.forEach(star => star.draw())
}

Starfield.prototype.move = function() {
    this.stars.forEach(star => star.move(this.d, this.theta))
}

function Star() {
    this.resetX()
    this.resetY()
    this.resetDiameter()
}

Star.prototype.resetX = function() {
    this.x = Math.floor(canvas.width * Math.random())
}

Star.prototype.resetY = function() {
    this.y = Math.floor(canvas.height * Math.random())
}

Star.prototype.resetDiameter = function() {
    this.r = Math.floor(1 + 2 * Math.random())
}

Star.prototype.draw = function() {
    ctx.fillStyle = rgbToHex(255, 255, 255)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
}

Star.prototype.move = function (d, theta) {
    this.x += Math.floor(d * Math.cos(theta))
    this.y += Math.floor(d * Math.sin(theta))

    if (this.x < minX) {
        this.x = maxX
        this.resetY()
        this.resetDiameter()
    }
    else if (this.x > maxX) {
        this.x = minX
        this.resetY()
        this.resetDiameter()
    }

    if (this.y < minY) {
        this.y = maxY
        this.resetX()
        this.resetDiameter()
    }
    else if (this.y > maxY) {
        this.y = minY
        this.resetX()
        this.resetDiameter()
    }
}
