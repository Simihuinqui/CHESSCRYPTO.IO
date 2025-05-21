const { Chess } = window.ChessJs;
const { Chessboard } = window.ReactChessboard;

function App() {
  const [game, setGame] = React.useState(new Chess());
  const [level, setLevel] = React.useState(null);
  const [status, setStatus] = React.useState("Selecciona nivel para comenzar");

  const makeBotMove = () => {
    const possibleMoves = game.moves();
    if (game.game_over() || possibleMoves.length === 0) return;

    // Simulación sencilla de dificultad: entre más nivel, menos aleatorio
    const move =
      level < 4
        ? possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        : possibleMoves[0]; // Mejores movimientos solo como demostración

    game.move(move);
    setGame(new Chess(game.fen()));
    setStatus("Tu turno");
  };

  const handleMove = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    setGame(new Chess(game.fen()));
    setStatus("Pensando...");
    setTimeout(makeBotMove, 500);
    return true;
  };

  if (level === null) {
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <h1>ChessCrypto</h1>
        <h3>Selecciona nivel de dificultad</h3>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
          <button key={lvl} onClick={() => { setLevel(lvl); setStatus("Tu turno"); }} style={{ margin: 5 }}>
            Nivel {lvl}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>ChessCrypto - Nivel {level}</h1>
      <Chessboard
        position={game.fen()}
        onPieceDrop={handleMove}
        boardWidth={560}
        pieceTheme={(piece) =>
          `https://chessboardjs.com/img/chesspieces/wikipedia/${piece}.png`
        }
      />
      <div style={{ marginTop: 20 }}>{status}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
