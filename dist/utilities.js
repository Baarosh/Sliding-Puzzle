"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfWin = exports.styleTiles = exports.shuffleTiles = exports.moveTiles = exports.changeTiles = exports.renderGame = void 0;
var renderGame = function (board, state) {
    var imageNum = Math.floor(Math.random() * 3);
    state.forEach(function (row, rowInd) {
        row.forEach(function (column, columnInd) {
            var newColumn = column;
            newColumn.style.backgroundImage = "url(./photo" + (imageNum + 1) + ".jpg)";
            if (newColumn.innerText === '') {
                newColumn.style.background = 'none';
                newColumn.style.border = 'none';
            }
            if (columnInd === 0)
                newColumn.style.left = '48px';
            else
                newColumn.style.left = 48 + columnInd * 101 + "px";
            if (rowInd === 0)
                newColumn.style.top = '48px';
            else
                newColumn.style.top = 48 + rowInd * 101 + "px";
            newColumn.style['background-position'] = "-" + columnInd * 100 + "px -" + rowInd * 100 + "px";
            board.appendChild(newColumn);
        });
    });
};
exports.renderGame = renderGame;
var changeTiles = function (x1, y1, x2, y2, state) {
    var tempTile = state[x1][y1];
    state[x1][y1] = state[x2][y2];
    state[x2][y2] = tempTile;
};
exports.changeTiles = changeTiles;
var moveTiles = function (el1, el2) {
    var _a;
    var newEl1 = el1;
    var newEl2 = el2;
    _a = [
        newEl2.style.top,
        newEl2.style.left,
        newEl1.style.top,
        newEl1.style.left,
    ], newEl1.style.top = _a[0], newEl1.style.left = _a[1], newEl2.style.top = _a[2], newEl2.style.left = _a[3];
};
exports.moveTiles = moveTiles;
var shuffleTiles = function (state) {
    for (var i = 0; i < 10; i += 1) {
        var nums = [1, 2, 3, 4].map(function () { return Math.floor(Math.random() * 3); });
        exports.moveTiles(state[nums[0]][nums[1]], state[nums[2]][nums[3]]);
        exports.changeTiles(nums[0], nums[1], nums[2], nums[3], state);
    }
};
exports.shuffleTiles = shuffleTiles;
var styleTiles = function (state) {
    state.forEach(function (row) {
        row.forEach(function (column) {
            var newColumn = column;
            newColumn.style.transition = 'all 0.4s ease-in-out';
        });
    });
};
exports.styleTiles = styleTiles;
var checkIfWin = function (board, state) {
    var newState00 = state[0][0];
    var newState01 = state[0][1];
    var newState02 = state[0][2];
    var newState10 = state[1][0];
    var newState11 = state[1][1];
    var newState12 = state[0][2];
    var newState20 = state[2][0];
    var newState21 = state[2][1];
    if (newState00.innerText === '1' &&
        newState01.innerText === '2' &&
        newState02.innerText === '3' &&
        newState10.innerText === '4' &&
        newState11.innerText === '5' &&
        newState12.innerText === '6' &&
        newState20.innerText === '7' &&
        newState21.innerText === '8') {
        board.innerHTML = '';
        var p = document.createElement('p');
        p.innerText = 'YOU WIN!';
        p.style.color = 'white';
        board.appendChild(p);
    }
};
exports.checkIfWin = checkIfWin;
