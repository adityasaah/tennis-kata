import { TennisGame } from './TennisGame.interface';

const SCORE: Record<number, string> = {
    0: 'Love',
    1: 'Fifteen',
    2: 'Thirty',
    3: 'Forty'
};

export class TennisGame2 implements TennisGame {
    P1point: number;
    P2point: number;

    private player1Name: string;
    private player2Name: string;

    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.P1point = 0;
        this.P2point = 0;
    }

    getScore(): string {
        if (this.P1point === this.P2point) {
            return this.getFinalScore();
        }

        if ((this.P1point >= 4 || this.P2point >= 4) && Math.abs(this.P1point - this.P2point) >= 2) {
            return `Win for ${this.getPlayerWithLargestScore()}`;
        }

        if (Math.min(this.P2point, this.P1point) >= 3) {
            return `Advantage ${this.getPlayerWithLargestScore()}`;
        }

        return `${SCORE[this.P1point]}-${SCORE[this.P2point]}`;
    }

    private getPlayerWithLargestScore() {
        return this.P1point > this.P2point ? this.player1Name : this.player2Name;
    }

    private getFinalScore() {
        if (this.P1point <= 2)
            return `${SCORE[this.P1point]}-All`;
        return 'Deuce';
    }

    // SetP1Score(score: number): void {
    //     for (let i = 0; i < score; i++) {
    //         this.P1Score();
    //     }
    // }
    //
    // SetP2Score(score: number): void {
    //     for (let i = 0; i < score; i++) {
    //         this.P2Score();
    //     }
    // }

    wonPoint(player: string): void {
        if (player === this.player1Name)
            this.P1Score();
        else
            this.P2Score();
    }

    P2Score(): void {
        this.P2point++;
    }

    P1Score(): void {
        this.P1point++;
    }
}