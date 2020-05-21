let canvas
let ctx
let textWidth
let textHeight
let tracks
let unusedTracks

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

    let ntracks = randInt(48, 64)
    textWidth = Math.floor(canvas.width / ntracks)
    textHeight = textWidth
    createTracks(ntracks)

    setInterval(draw, 128)
}

function createGreekString() {
    let s = Array(randInt(5, 20))
    for (let i = 0; i < s.length; i++) {
        s[i] = String.fromCharCode(randInt(880, 1023))
    }
    return s
}

function createEmptyTrack() {
    return {
        x: 0,
        y: 0,
        text: [],
        mutated: []
    }
}

function createTracks(n) {
    tracks = Array(n)
    unusedTracks = []
    let nrows = Math.floor(canvas.height / textHeight)
    for (let i = 0; i < n; i++) {
        if (randInt(0, 4)) {
            let text = createGreekString()
            let mutated = Array(text.length)
            mutated.fill(false)
            tracks[i] = {
                x: i * textWidth,
                y: randInt(0, nrows - 1) * textHeight,
                dy: randInt(1, 3),
                text: text,
                mutated: mutated,
            }
        }
        else {
            unusedTracks.push(i)
            tracks[i] = createEmptyTrack()
        }
    }
    // console.log(tracks, unusedTracks)
}

function drawTracks() {
    tracks.forEach(track => {
        for (let i = 0; i < track.text.length; i++) {
            if (track.mutated[i] || i == track.text.length - 1) {
                ctx.font = '' + Math.floor(1.2 * textHeight) + 'px Serif'
                ctx.fillStyle = rgbToHex(255, 255, 255)
                ctx.fillText(
                    track.text[i],
                    track.x,
                    track.y + i * textHeight
                )
            }
            else {
                ctx.font = '' + textHeight + 'px Serif'
                ctx.strokeStyle = rgbToHex(0, 255, 0)
                ctx.strokeText(
                    track.text[i],
                    track.x,
                    track.y + i * textHeight
                )
            }
        }
    })
}

function moveTracks() {
    tracks.forEach((track, i) => {
        if (track.text.length == 0) {
            return
        }
        track.y += (track.dy * textHeight)
        if (track.y >= canvas.height) {
            tracks[i] = createEmptyTrack()
            let j = randInt(0, unusedTracks.length - 1)
            let new_i = unusedTracks[j]
            let text = createGreekString()
            let mutated = Array(text.length)
            mutated.fill(false)
            tracks[new_i] = {
                x: new_i * textWidth,
                y: -text.length * textHeight,
                dy: randInt(1, 3),
                text: text,
                mutated: mutated
            }
            unusedTracks[j] = i
        }
        else {
            // randomly mutate characters
            track.mutated.fill(false)
            let m = randInt(1, 3)
            for (let j = 0; j < m; j++) {
                let k = randInt(0, track.text.length)
                track.text[k] = String.fromCharCode(randInt(880, 1023))
                track.mutated[k] = true
            }
        }
    })
}

function draw() {
    ctx.fillStyle = rgbToHex(0, 0, 0)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawTracks()
    moveTracks()
}

window.addEventListener('load', init)
