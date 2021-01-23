import * as uts from './utilities.js'

const gameBoard: HTMLDivElement | null = document.querySelector('.game-board')
const tiles: NodeList | null = document.querySelectorAll('.tile')

const gameState: Node[][] = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]],
]

uts.renderGame(gameBoard, gameState)
uts.shuffleTiles(gameState)
setTimeout(uts.styleTiles, 0.1, gameState)

gameBoard.addEventListener('click', (e: MouseEvent) => {
    const targetTile = e.target as HTMLDivElement
    const targetClass: DOMTokenList | null = targetTile.classList
    if (targetClass[0] === 'tile') {
        let x: number
        let y: number
        let xEmpty: number
        let yEmpty: number

        gameState.forEach((row, rowInd) => {
            row.forEach((column, columnInd) => {
                const newColumn = column as HTMLElement
                if (targetTile === newColumn) {
                    x = rowInd
                    y = columnInd
                }

                if (newColumn.innerText === '') {
                    xEmpty = rowInd
                    yEmpty = columnInd
                }
            })
        })

        if (
            (Math.abs(x - xEmpty) === 1 && y - yEmpty === 0) ||
            (Math.abs(y - yEmpty) === 1 && x - xEmpty === 0)
        ) {
            uts.moveTiles(gameState[x][y], gameState[xEmpty][yEmpty])
            uts.changeTiles(x, y, xEmpty, yEmpty, gameState)
            setTimeout(uts.checkIfWin, 700, gameBoard, gameState)
        }
    }
})