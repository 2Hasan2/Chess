export default class Chess {
    constructor(id) {
        this.board = document.getElementById(id);
        this.selectedPiece = null;
        this.squares = [];
        this.step = 8;
        this.player = "black";
        this.time = 0;
        this.over = false;
        this.NewPieceSymbols = [
            "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
            "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
            "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"
        ];
        this.pieceSymbols = [
            "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
            "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            " ", " ", " ", " ", " ", " ", " ", " ",
            "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
            "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"
        ]
    };

    start() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement("div");
                square.classList.add("square");
                if ((row + col) % 2 === 1) {
                    square.style.backgroundColor = "var(--color1)";
                } else {
                    square.style.backgroundColor = "var(--color2)";
                }
                this.squares.push(square);
                this.board.appendChild(square);
            }
        }
        this.setPieces();
    }

    clear() {
        this.squares.forEach(square => {
            square.textContent = "";
        });
    }

    setTimer() {
        setInterval(() => {
            if (!this.over) {
                this.time++;
            }
            const format = (num) => {
                return num < 10 ? "0" + num : num;
            }
            const hour = format(Math.floor(this.time / 3600));
            const minute = format(Math.floor(this.time / 60) % 60);
            const second = format(this.time % 60);
            let time = `${hour}:${minute}:${second}`;
            document.getElementById("time").textContent = time;
        }, 1000);
    }

    switchPlayer() {
        this.player = this.player === "white" ? "black" : "white";
        player.textContent = this.player;
    }

    reset() {
        this.pieceSymbols = this.NewPieceSymbols.slice();
        this.updatePieces();
    }

    setPieces() {
        this.squares.forEach((square, index) => {
            const piece = document.createElement("div");
            piece.classList.add("piece");
            piece.textContent = this.pieceSymbols[index];
            square.appendChild(piece);
        });
    }

    updatePieces() {
        this.clear();
        this.setPieces();
    }

    showPossibleMoves(index) {
        this.moveStyle("possible");
        this.addStyle(this.possibleMoves(index), "possible");
    }

    moveStyle(styleName) {
        this.squares.forEach(square => {
            square.classList.remove(styleName);
        });
    }

    addStyle(array, styleName) {
        array.forEach(square => {
            this.squares[square].classList.add(styleName);
        });
    }

    typeOfPiece(index) {
        return this.pieceSymbols[index];
    }

    colorOfPiece(index) {
        const whitePieces = ["♖", "♘", "♗", "♕", "♔", "♙"];
        if (whitePieces.includes(this.pieceSymbols[index])) {
            return "white";
        } else {
            return "black";
        }
    }

    possibleMoves(index) {
        switch (this.typeOfPiece(index)) {
            case "♖":
                return this.rookMoves(index);
            case "♘":
                return this.knightMoves(index);
            case "♗":
                return this.bishopMoves(index);
            case "♕":
                return this.queenMoves(index);
            case "♔":
                return this.kingMoves(index);
            case "♙":
                return this.pawnMoves(index);
            case "♜":
                return this.rookMoves(index);
            case "♞":
                return this.knightMoves(index);
            case "♝":
                return this.bishopMoves(index);
            case "♛":
                return this.queenMoves(index);
            case "♚":
                return this.kingMoves(index);
            case "♟":
                return this.pawnMoves(index);
            default:
                return [];
        }
    }

    rookMoves(index) {
        const moves = [];
        const row = Math.floor(index / this.step);
        const col = index % this.step;
        const directions = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];
        for (let i = 0; i < directions.length; i++) {
            for (let j = 1; j < this.step; j++) {
                const newRow = row + j * directions[i][0];
                const newCol = col + j * directions[i][1];
                if (newRow >= 0 && newRow < this.step && newCol >= 0 && newCol < this.step) {
                    const newIndex = newRow * this.step + newCol;
                    if (this.typeOfPiece(newIndex) === " ") {
                        moves.push(newIndex);
                    } else {
                        if (this.colorOfPiece(index) !== this.colorOfPiece(newIndex)) {
                            moves.push(newIndex);
                        }
                        break;
                    }
                }
            }
        }
        return moves;
    }

    knightMoves(index) {
        const moves = [];
        const row = Math.floor(index / this.step);
        const col = index % this.step;
        const directions = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1]
        ];
        for (let i = 0; i < directions.length; i++) {
            const newRow = row + directions[i][0];
            const newCol = col + directions[i][1];
            if (newRow >= 0 && newRow < this.step && newCol >= 0 && newCol < this.step) {
                const newIndex = newRow * this.step + newCol;
                if (this.typeOfPiece(newIndex) === " ") {
                    moves.push(newIndex);
                } else {
                    if (this.colorOfPiece(index) !== this.colorOfPiece(newIndex)) {
                        moves.push(newIndex);
                    }
                }
            }
        }
        return moves;
    }

    bishopMoves(index) {
        const moves = [];
        const row = Math.floor(index / this.step);
        const col = index % this.step;
        const directions = [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];
        for (let i = 0; i < directions.length; i++) {
            for (let j = 1; j < this.step; j++) {
                const newRow = row + j * directions[i][0];
                const newCol = col + j * directions[i][1];
                if (newRow >= 0 && newRow < this.step && newCol >= 0 && newCol < this.step) {
                    const newIndex = newRow * this.step + newCol;
                    if (this.typeOfPiece(newIndex) === " ") {
                        moves.push(newIndex);
                    } else {
                        if (this.colorOfPiece(index) !== this.colorOfPiece(newIndex)) {
                            moves.push(newIndex);
                        }
                        break;
                    }
                }
            }
        }
        return moves;
    }

    queenMoves(index) {
        return this.rookMoves(index).concat(this.bishopMoves(index));
    }

    kingMoves(index) {
        const moves = [];
        const row = Math.floor(index / this.step);
        const col = index % this.step;
        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
        for (let i = 0; i < directions.length; i++) {
            const newRow = row + directions[i][0];
            const newCol = col + directions[i][1];
            if (newRow >= 0 && newRow < this.step && newCol >= 0 && newCol < this.step) {
                const newIndex = newRow * this.step + newCol;
                if (this.typeOfPiece(newIndex) === " ") {
                    moves.push(newIndex);
                } else {
                    if (this.colorOfPiece(index) !== this.colorOfPiece(newIndex)) {
                        moves.push(newIndex);
                    }
                }
            }
        }
        return moves;
    }

    pawnMoves(index) {
        const moves = [];
        const row = Math.floor(index / this.step);
        const col = index % this.step;
        const direction = this.colorOfPiece(index) === "white" ? 1 : -1;

        const newRow = row + direction
        if (newRow >= 0 && newRow < this.step && this.typeOfPiece(index + direction * this.step) === " ") {
            moves.push(index + direction * this.step);

            const firstMove = this.colorOfPiece(index) === "white" ? row === 1 : row === 6;
            if (firstMove && this.typeOfPiece(index + direction * 2 * this.step) === " ") {
                moves.push(index + direction * 2 * this.step);
            }
        }

        const leftDiagonal = index + direction * this.step - 1;
        if (col > 0 && this.colorOfPiece(leftDiagonal) !== this.colorOfPiece(index) && this.typeOfPiece(leftDiagonal) !== " ") {
            moves.push(leftDiagonal);
        }

        const rightDiagonal = index + direction * this.step + 1;
        if (col < this.step - 1 && this.colorOfPiece(rightDiagonal) !== this.colorOfPiece(index) && this.typeOfPiece(rightDiagonal) !== " ") {
            moves.push(rightDiagonal);
        }

        return moves;
    }

    movePiece(from, to) {
        this.pieceSymbols[to] = this.pieceSymbols[from];
        this.pieceSymbols[from] = " ";
        this.updatePieces();
    }

    isGameOver() {
        if (!this.pieceSymbols.includes('♔')) {
            // Black king is captured
            this.displayGameOver("Black");
            return true;
        } else if (!this.pieceSymbols.includes('♚')) {
            // White king is captured
            this.displayGameOver("White");
            return true;
        }
        return false;
    }

    displayGameOver(winner) {
        this.over = true;
        alert(`Game over! ${winner} wins.`);
    }
}