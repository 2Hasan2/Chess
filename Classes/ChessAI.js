export default class ChessAI {
    constructor(chess) {
        this.chess = chess;
    }

    makeRandomMove() {
        if (this.chess.isGameOver()) {
            return;
        }
        const legalMoves = this.findLegalMoves();
        if (legalMoves.length === 0) {
            return; // No legal moves, game over.
        }

        const randomIndex = Math.floor(Math.random() * legalMoves.length);
        const selectedMove = legalMoves[randomIndex];

        this.chess.movePiece(selectedMove.from, selectedMove.to);
        this.chess.switchPlayer();
    }

    findLegalMoves() {
        const legalMoves = [];

        for (let from = 0; from < 64; from++) {
            if (this.chess.player === this.chess.colorOfPiece(from)) {
                const possibleMoves = this.chess.possibleMoves(from);

                for (const to of possibleMoves) {
                    const boardCopy = this.chess.pieceSymbols.slice();
                    boardCopy[to] = boardCopy[from];
                    boardCopy[from] = ' ';

                    const opponentKingIndex = boardCopy.indexOf(this.chess.player === 'white' ? '♚' : '♔');
                    if (!this.isKingInCheck(boardCopy, opponentKingIndex)) {
                        legalMoves.push({ from, to });
                    }
                }
            }
        }

        return legalMoves;
    }

    isKingInCheck(board, kingIndex) {
        return false; // Implement logic to check if the king is in check.
    }
}
