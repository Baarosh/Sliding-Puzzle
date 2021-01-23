export const renderGame = (board: HTMLDivElement, state: Node[][]): void => {
    const imageNum: number = Math.floor(Math.random() * 3)

    state.forEach((row, rowInd) => {
        row.forEach((column, columnInd) => {
            const newColumn = column as HTMLElement
            newColumn.style.backgroundImage = `url(./photo${imageNum + 1}.jpg)`

            if (newColumn.innerText === '') {
                newColumn.style.background = 'none'
                newColumn.style.border = 'none'
            }

            if (columnInd === 0) newColumn.style.left = '48px'
            else newColumn.style.left = `${48 + columnInd * 101}px`
            if (rowInd === 0) newColumn.style.top = '48px'
            else newColumn.style.top = `${48 + rowInd * 101}px`

            newColumn.style['background-position'] = `-${columnInd * 100}px -${
                rowInd * 100
            }px`
            board.appendChild(newColumn)
        })
    })
}

export const changeTiles = (x1: number, y1: number, x2: number, y2: number, state: Node[][]): void => {
    const tempTile = state[x1][y1]
    state[x1][y1] = state[x2][y2]
    state[x2][y2] = tempTile
}

export const moveTiles = (el1: Node, el2: Node): void => {
    const newEl1 = el1 as HTMLElement
    const newEl2 = el2 as HTMLElement
    [newEl1.style.top, newEl1.style.left, newEl2.style.top, newEl2.style.left] = [
        newEl2.style.top,
        newEl2.style.left,
        newEl1.style.top,
        newEl1.style.left,
    ]
}

export const shuffleTiles = (state: Node[][]): void => {
    for (let i = 0; i < 10; i += 1) {
        const nums: number[] = [1, 2, 3, 4].map(() => Math.floor(Math.random() * 3))
        moveTiles(state[nums[0]][nums[1]], state[nums[2]][nums[3]])
        changeTiles(nums[0], nums[1], nums[2], nums[3], state)
    }
}

export const styleTiles = (state: Node[][]): void => {
    state.forEach((row) => {
        row.forEach((column) => {
            const newColumn = column as HTMLElement
            newColumn.style.transition = 'all 0.4s ease-in-out'
        })
    })
}

export const checkIfWin = (board: HTMLDivElement, state: Node[][]): void => {
    const newState00 = state[0][0] as HTMLElement
    const newState01 = state[0][1] as HTMLElement
    const newState02 = state[0][2] as HTMLElement
    const newState10 = state[1][0] as HTMLElement
    const newState11 = state[1][1] as HTMLElement
    const newState12 = state[0][2] as HTMLElement
    const newState20 = state[2][0] as HTMLElement
    const newState21 = state[2][1] as HTMLElement
    if (
        newState00.innerText === '1' &&
        newState01.innerText === '2' &&
        newState02.innerText === '3' &&
        newState10.innerText === '4' &&
        newState11.innerText === '5' &&
        newState12.innerText === '6' &&
        newState20.innerText === '7' &&
        newState21.innerText === '8'
    ) {
        board.innerHTML = ''
        const p : HTMLParagraphElement = document.createElement('p')
        p.innerText = 'YOU WIN!'
        p.style.color = 'white'
        board.appendChild(p)
    }
}