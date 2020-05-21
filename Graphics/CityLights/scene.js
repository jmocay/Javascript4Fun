let canvas
let ctx
let cityLights

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    cityLights = new CityLights()

    setInterval(draw, 16);
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    cityLights.draw()
    cityLights.move()
}

window.addEventListener('load', init)
