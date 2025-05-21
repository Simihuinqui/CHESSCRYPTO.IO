
let board = null;
let game = new Chess();
let level = 1;

document.getElementById('startBtn').addEventListener('click', () => {
    level = parseInt(document.getElementById('levelSelect').value);
    game.reset();
    board.start();
    document.getElementById('status').textContent = "Tu turno (blancas)";
});

function makeBotMove() {
    const moves = game.moves();
    if (moves.length === 0) return;

    let move = null;
    if (level <= 3) {
        move = moves[Math.floor(Math.random() * moves.length)];
    } else {
        move = getBestMove(game, level);
    }
    game.move(move);
    board.position(game.fen());
    if (game.game_over()) {
        document.getElementById('status').textContent = "¡Fin del juego!";
    } else {
        document.getElementById('status').textContent = "Tu turno (blancas)";
    }
}

function getBestMove(game, depth) {
    let bestMove = null;
    let bestValue = -Infinity;

    game.moves().forEach(move => {
        game.move(move);
        let value = minimax(game, depth - 1, false);
        game.undo();
        if (value > bestValue) {
            bestValue = value;
            bestMove = move;
        }
    });
    return bestMove;
}

function minimax(game, depth, isMaximizing) {
    if (depth === 0) return -evaluateBoard(game.board());

    let moves = game.moves();
    let bestValue = isMaximizing ? -Infinity : Infinity;

    for (let move of moves) {
        game.move(move);
        let value = minimax(game, depth - 1, !isMaximizing);
        game.undo();
        bestValue = isMaximizing ? Math.max(bestValue, value) : Math.min(bestValue, value);
    }
    return bestValue;
}

function evaluateBoard(board) {
    const values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 };
    let eval = 0;
    for (let row of board) {
        for (let piece of row) {
            if (piece) {
                let val = values[piece.type] || 0;
                eval += piece.color === 'w' ? val : -val;
            }
        }
    }
    return eval;
}

board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: (source, target) => {
        const move = game.move({ from: source, to: target, promotion: 'q' });
        if (!move) return 'snapback';
        document.getElementById('status').textContent = "Pensando...";
        setTimeout(makeBotMove, 500);
    }
});
