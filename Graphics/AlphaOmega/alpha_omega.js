var canvas
var ctx
var textWidth
var textHeight
var tracks
var emptyTracks

function randInt(min, max) {
    return Math.floor(Math.round(Math.random() * (max - min)) + min)
}

function toHex(n) {
    return n.toString(16).padStart(2, '0').toUpperCase()
}

function rgbToHex(r, g, b) {
    return "#" + toHex(r) + toHex(g) + toHex(b)
}

function init() {
    canvas = document.querySelector(".drawing__area")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")

    let n = randInt(48, 64)
    textWidth = Math.floor(canvas.width / n)
    textHeight = textWidth

    createTracks(n)

    setInterval(draw, 128)
}

function createGreekText() {
    let s = []
    let slen = randInt(10, 20)
    for (let i = 0; i < slen; i++) {
        s.push(String.fromCharCode(randInt(880, 1023)))
    }

    return s
}

function createTracks(n) {
    tracks = []
    emptyTracks = []

    let nrows = Math.floor(canvas.height / textHeight)

    for (let i = 0; i < n; i++) {
        if (randInt(0, 4)) {
            let text = createGreekText()
            let mutated = Array(text.length)
            mutated.fill(false)
            tracks.push({
                x: i * textWidth,
                y: randInt(0, nrows) * textHeight,
                dy: randInt(1, 3),
                text: text,
                mutated: mutated
            })
        }
        else {
            emptyTracks.push(i)
            tracks.push({
                x: 0,
                y: 0,
                text: []
            })
        }
    }
}

function drawTracks() {
    for (let i = 0; i < tracks.length; i++) {
        for (let j = 0; j < tracks[i].text.length; j++) {
            if (tracks[i].mutated[j] || j == tracks[i].text.length - 1) {
                // display mutated characters in bold white
                ctx.font = 'bold ' + Math.floor(1.2 * textHeight) + 'px Serif'
                ctx.fillStyle = rgbToHex(255, 255, 255)
                ctx.fillText(
                    tracks[i].text[j],
                    tracks[i].x,
                    tracks[i].y + j * textHeight
                )
            }
            else {
                ctx.font = '' + textHeight + 'px Serif'
                ctx.strokeWidth = 1
                ctx.strokeStyle = rgbToHex(0, 255, 0)
                ctx.strokeText(
                    tracks[i].text[j],
                    tracks[i].x,
                    tracks[i].y + j * textHeight
                )
            }
        }
    }
}

function moveTracks() {
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].text.length == 0) {
            continue
        }

        tracks[i].y += (tracks[i].dy * textHeight)

        if (tracks[i].y >= canvas.height) {
            // add this track to unused pool
            tracks[i] = {
                x: 0, y: 0, text: [], mutated: []
            }
            emptyTracks.push(i)

            // select a new track from unused pool
            let j = randInt(0, emptyTracks.length - 1)
            let new_i = emptyTracks[j]
            let text = createGreekText()
            let mutated = Array(text.length)
            mutated.fill(false)
            tracks[new_i] = {
                x: new_i * textWidth,
                y: -text.length * textHeight,
                dy: randInt(1, 3),
                text: text,
                mutated: mutated
            }

            // remove selected track from unused pool
            emptyTracks.splice(j, 1)
        }
        else {
            // mutate a random character
            tracks[i].mutated.fill(false)
            let m = randInt(0, tracks[i].text.length - 1)
            tracks[i].text[m] = String.fromCharCode(randInt(880, 1023))
            tracks[i].mutated[m] = true
        }
    }
}

function draw() {
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawTracks()
    moveTracks()
}

window.addEventListener('load', init)
