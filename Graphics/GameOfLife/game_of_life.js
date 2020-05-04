var canvas
var ctx
var state
var prevState

const init = () => {
    canvas = document.querySelector(".drawing__canvas")
    canvas.width = 1024
    canvas.height = 768
    ctx = canvas.getContext("2d")
    initCells()
    drawCells()
    setInterval(draw, 250);
}

const randInt = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const initCells = () => {
    state = new Array(160)
    prevState = new Array(160)
    for (let i = 0; i < state.length; i++) {
        state[i] = new Array(160)
        prevState[i] = new Array(160)
    }

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            state[i][j] = randInt(0, 1)
            prevState[i][j] = state[i][j]
        }
    }
}

const updateCells = () => {
    let i, j

    for (i = 0; i < prevState.length; i++) {
        for (j = 0; j < prevState[i].length; j++) {
            // Count the live neighbours
            let liveNeigh = 0
            for (let m = i - 1; m < i + 2; m++) {
                if (m < 0 || m == prevState.length)
                    continue
                for (let n = j - 1; n < j + 2; n++) {
                    if ((n < 0 || n == prevState[i].length) || (i == m && j == n))
                        continue
                    liveNeigh += prevState[m][n]
                }
            }

            // Apply Conway's Game of Life Rules
            if (state[i][j] == 1) {
                if (liveNeigh < 2 || liveNeigh > 3) { // die if under/over populated
                    state[i][j] = 0
                }
            }
            else if (liveNeigh == 3) {
                state[i][j] = 1
            }
        }
    }

    // Copy current state to previous for next generation
    for (i = 0; i < state.length; i++) {
        for (j = 0; j < state[i].length; j++) {
            prevState[i][j] = state[i][j]
        }
    }
}

const drawCells = () => {
    let cellWidth = Math.floor(canvas.width / state[0].length)
    let cellHeight = Math.floor(canvas.height / state.length)
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            ctx.fillStyle = (state[i][j] == 1) ? "#000000" : "#FFFFFF"
            ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight)
        }
    }
}

const draw = () => {
    updateCells()
    drawCells()
}

window.addEventListener('load', init)