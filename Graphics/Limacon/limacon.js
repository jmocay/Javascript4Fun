let canvas
let ctx
let xTranslate
let yTranslate
let limacon

class Limacon {
    constructor(initArgs) {
        this.r = initArgs.r
        this.theta = 0
        this.phi = 0
        this.dtheta = 2
        this.dphi = this.dtheta / 2
        this.pts = []
    }

    draw() {
        ctx.strokeStyle = rgbToHex(255, 255, 255)

        this.theta += this.dtheta
        if (this.theta > 360) {
            this.theta -= 360
            console.log('reset 1')
        }

        this.phi +=  this.dphi
        if (this.phi > 360) {
            this.phi -= 360
            console.log('reset 2')
            this.pts = []
        }

        let x = Math.floor(2 * this.r * Math.cos(this.phi * Math.PI / 180))
        let y = Math.floor(-2 * this.r * Math.sin(this.phi * Math.PI / 180))

        let ptx = x + Math.floor(this.r * Math.cos(this.theta * Math.PI / 180))
        let pty = y + Math.floor(-this.r * Math.sin(this.theta * Math.PI / 180))

        this.pts.push({
            ptx, pty
        })

        // plot the limacon curve
        if (this.pts.length >= 3) {
            ctx.strokeStyle = rgbToHex(255, 0, 0)
            ctx.lineWidth = 2
            for (let i = 0; i < this.pts.length - 2; i++) {
                ctx.beginPath()
                ctx.moveTo(this.pts[i].ptx, this.pts[i].pty)
                ctx.quadraticCurveTo(
                    this.pts[i + 1].ptx, this.pts[i + 1].pty,
                    this.pts[i + 2].ptx, this.pts[i + 2].pty
                )
                ctx.stroke()
            }
        }
        else {
            ctx.fillStyle = rgbToHex(255, 0, 0)
            this.pts.forEach(pt => {
                ctx.beginPath()
                ctx.arc(pt.ptx, pt.pty, 1, 0, 2 * Math.PI)
                ctx.fill()
            })
        }

        // plot the two circles
        ctx.strokeStyle = rgbToHex(255, 255, 255)
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x, y, this.r, 0, 2 * Math.PI)
        ctx.stroke()

        // plot the circle radii of both circles
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(ptx, pty)
        ctx.stroke()

        // plot the center of the two circles
        ctx.fillStyle = rgbToHex(255, 255, 255)
        ctx.beginPath()
        ctx.arc(0, 0, 4, 0, 2 * Math.PI)
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()

        // plot the rotating point on the outer circle
        ctx.fillStyle = rgbToHex(0, 128, 255)
        ctx.beginPath()
        ctx.arc(ptx, pty, 8, 0, 2*Math.PI)
        ctx.fill()
    }
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    xTranslate = Math.floor(canvas.width / 2)
    yTranslate = Math.floor(canvas.height / 2)

    limacon = new Limacon({
        r: Math.floor(xTranslate / 4)
    })

    setInterval(draw, 16) // set this to 16 for approx 60 frames/sec refresh rate
}

function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.translate(xTranslate, yTranslate)

    limacon.draw()
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

window.addEventListener('load', init)
