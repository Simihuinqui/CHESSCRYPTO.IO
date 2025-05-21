<Chessboard
  position={game.fen()}
  onPieceDrop={handleMove}
  boardWidth={560}
  customBoardStyle={{ borderRadius: '4px', boxShadow: '0 5px 15px rgba(0,0,0,0.25)' }}
  customPieces={undefined}
  pieceTheme="https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png"
/>
