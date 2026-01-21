"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameManager {
    constructor() {
        this.games = [];
    }
    // For Singleton patterns. This means everyone uses only one instance of the class
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        return this.instance;
    }
    addMove(gameId, move) {
        console.log(`Adding Move ${move} to game ${gameId}`);
        const game = this.games.find((game) => game.id === gameId);
        if (!game) {
            console.log(`Game ${gameId} not found`);
            return;
        }
        game.moves.push(move);
    }
    addGame(id, blackPlayerName, whitePlayerName) {
        const game = {
            id: id,
            blackPlayerName,
            whitePlayerName,
            moves: [],
        };
        this.games.push(game);
    }
    log() {
        console.log(this.games);
    }
}
exports.default = GameManager;
