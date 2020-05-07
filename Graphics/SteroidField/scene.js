var canvas
var ctx
var asteroidBelt
var starfield

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    asteroidBelt = new AsteroidBelt(
        Math.floor(canvas.width / 2), Math.floor(canvas.height / 2),
        320, 200)
    starfield = new Starfield()

    setInterval(draw, 32);
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // starfield.draw()
    // starfield.move()

    ctx.translate(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))

    asteroidBelt.draw()
    asteroidBelt.move()

    ctx.fillStyle = rgbToHex(255, 255, 0)
    ctx.beginPath()
    ctx.arc(0, 0, 16, 0, 2 * Math.PI)
    ctx.fill()
}

window.addEventListener('load', init)
