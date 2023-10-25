import Chess from "./Classes/Chess.js";
import ChessAI from "./Classes/ChessAI.js";

const chess = new Chess("chessboard");

chess.start();
chess.setTimer();
player.textContent = chess.player;

const chessAI = new ChessAI(chess);


chess.squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (chess.over) {
            return;
        }
        if (chess.player === chess.colorOfPiece(index) && chess.typeOfPiece(index) !== " " && chess.player === "black") {
            chess.moveStyle("selected");
            chess.moveStyle("possible");
            chess.addStyle([index], "selected");
            chess.showPossibleMoves(index);
            chess.selectedPiece = index;
        } else if (chess.squares[index].classList.contains("possible")) {
            chess.movePiece(chess.selectedPiece, index);
            chess.switchPlayer();
            chess.moveStyle("selected");
            chess.moveStyle("possible");

            // Check if the game is over (king capture)
            if (!chess.isGameOver()) {
                // After the user's move, let the AI make its move
                playAI();
            }
        }
    });
});

// Function to handle AI moves
function playAI() {
    if (chess.player === "white") {
        setTimeout(() => {
            chessAI.makeRandomMove();
        }, 1000);
    }
}
