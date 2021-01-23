"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uts = __importStar(require("./utilities.js"));
var gameBoard = document.querySelector('.game-board');
var tiles = document.querySelectorAll('.tile');
var gameState = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]],
];
uts.renderGame(gameBoard, gameState);
uts.shuffleTiles(gameState);
setTimeout(uts.styleTiles, 0.1, gameState);
gameBoard.addEventListener('click', function (e) {
    var targetTile = e.target;
    var targetClass = targetTile.classList;
    if (targetClass[0] === 'tile') {
        var x_1;
        var y_1;
        var xEmpty_1;
        var yEmpty_1;
        gameState.forEach(function (row, rowInd) {
            row.forEach(function (column, columnInd) {
                var newColumn = column;
                if (targetTile === newColumn) {
                    x_1 = rowInd;
                    y_1 = columnInd;
                }
                if (newColumn.innerText === '') {
                    xEmpty_1 = rowInd;
                    yEmpty_1 = columnInd;
                }
            });
        });
        if ((Math.abs(x_1 - xEmpty_1) === 1 && y_1 - yEmpty_1 === 0) ||
            (Math.abs(y_1 - yEmpty_1) === 1 && x_1 - xEmpty_1 === 0)) {
            uts.moveTiles(gameState[x_1][y_1], gameState[xEmpty_1][yEmpty_1]);
            uts.changeTiles(x_1, y_1, xEmpty_1, yEmpty_1, gameState);
            setTimeout(uts.checkIfWin, 700, gameBoard, gameState);
        }
    }
});
