/* eslint-disable no-param-reassign */
const gameBoard = document.querySelector('.game-board')
const tiles = document.querySelectorAll('.tile')

const gameState = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]],
]

const renderGame = (board, state) => {
    const imageNum = Math.floor(Math.random() * 3)

    state.forEach((row, rowInd) => {
        row.forEach((column, columnInd) => {
            column.style.backgroundImage = `url(./photo${imageNum + 1}.jpg)`

            if (column.innerText === '') {
                column.style.background = 'none'
                column.style.border = 'none'
            }

            if (columnInd === 0) column.style.left = '48px'
            else column.style.left = `${48 + columnInd * 101}px`
            if (rowInd === 0) column.style.top = '48px'
            else column.style.top = `${48 + rowInd * 101}px`

            column.style['background-position'] = `-${columnInd * 100}px -${
                rowInd * 100
            }px`
            board.appendChild(column)
        })
    })
}

const changeTiles = (x1, y1, x2, y2, state) => {
    const tempTile = state[x1][y1]
    state[x1][y1] = state[x2][y2]
    state[x2][y2] = tempTile
}

const moveTiles = (el1, el2) => {
    // eslint-disable-next-line no-extra-semi
    ;[el1.style.top, el1.style.left, el2.style.top, el2.style.left] = [
        el2.style.top,
        el2.style.left,
        el1.style.top,
        el1.style.left,
    ]
}

const shuffleTiles = (state) => {
    for (let i = 0; i < 10; i += 1) {
        const nums = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 3))
        moveTiles(state[nums[0]][nums[1]], state[nums[2]][nums[3]])
        changeTiles(nums[0], nums[1], nums[2], nums[3], state)
    }
}

const styleTiles = (state) => {
    state.forEach((row) => {
        row.forEach((column) => {
            column.style.transition = 'all 0.4s ease-in-out'
        })
    })
}

const checkIfWin = (board, state) => {
    if (
        state[0][0].innerText === 1 &&
        state[0][1].innerText === 2 &&
        state[0][2].innerText === 3 &&
        state[1][0].innerText === 4 &&
        state[1][1].innerText === 5 &&
        state[1][2].innerText === 6 &&
        state[2][0].innerText === 7 &&
        state[2][1].innerText === 8
    ) {
        board.innerHTML = ''
        const p = document.createElement('p')
        p.innerText = 'YOU WIN!'
        p.style.color = 'white'
        board.appendChild(p)
    }
}

renderGame(gameBoard, gameState)
shuffleTiles(gameState)
setTimeout(styleTiles, 0.1, gameState)

gameBoard.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'tile') {
        const targetTile = e.target
        let x
        let y
        let xEmpty
        let yEmpty

        gameState.forEach((row, rowInd) => {
            row.forEach((column, columnInd) => {
                if (targetTile === column) {
                    x = rowInd
                    y = columnInd
                }

                if (column.innerText === '') {
                    xEmpty = rowInd
                    yEmpty = columnInd
                }
            })
        })

        if (
            (Math.abs(x - xEmpty) === 1 && y - yEmpty === 0) ||
            (Math.abs(y - yEmpty) === 1 && x - xEmpty === 0)
        ) {
            moveTiles(gameState[x][y], gameState[xEmpty][yEmpty])
            changeTiles(x, y, xEmpty, yEmpty, gameState)
            setTimeout(checkIfWin, 700, gameBoard, gameState)
        }
    }
})
