function AsteroidBelt(x, y, a, b) {
    this.x = x
    this.y = y
    this.a = a
    this.b = b

    this.asteroids = []
    let n = Math.floor(64 + 64 * Math.random())
    for (let i = 0; i < n; i++) {
        this.asteroids.push(new Asteroid({
            a: Math.floor(a + 40 * Math.random()),
            b: Math.floor(b + 40 * Math.random()),
            d: Math.floor(2 + 4 * Math.random()),
            v: Math.floor(1 + Math.random()),
            color: {
                r: 160,
                g: 82,
                b: 45
            }
        }))
    }
}

AsteroidBelt.prototype.draw = function () {
    this.asteroids.forEach(asteroid => asteroid.draw())
}

AsteroidBelt.prototype.move = function () {    
    this.asteroids.forEach(asteroid => asteroid.move())
}

function Asteroid(props) {
    this.a = props.a
    this.b = props.b
    this.d = props.d
    this.v = props.v
    this.color = props.color
    this.theta = Math.floor(360 * Math.random())
}

Asteroid.prototype.draw = function () {
    ctx.fillStyle = rgbToHex(this.color.r, this.color.g, this.color.b)
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI)
    ctx.fill()

}

Asteroid.prototype.move = function () {
    this.theta += this.v
    if (this.theta >= 360) {
        this.theta = this.theta % 360
    }
    let theta_r = this.theta * Math.PI / 180
    this.x = Math.floor(this.a * Math.cos(theta_r))
    this.y = Math.floor(this.b * Math.sin(theta_r))
}
