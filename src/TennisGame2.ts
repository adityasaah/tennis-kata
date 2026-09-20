import { TennisGame } from './TennisGame.interface';

const SCORE: Record<number, string> = {
    0: 'Love',
    1: 'Fifteen',
    2: 'Thirty',
    3: 'Forty'
};

export class TennisGame2 implements TennisGame {
    P1point: number = 0;
    P2point: number = 0;

    P1res: string = '';
    P2res: string = '';

    private player1Name: string;
    private player2Name: string;

    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }

    getScore(): string {
        let score: string = '';
        if (this.P1point === this.P2point) {
            if (this.P1point === 0)
                score = 'Love-All';
            else if (this.P1point === 1)
                score = 'Fifteen-All';
            else if (this.P1point === 2)
                score = 'Thirty-All';
            else
                score = 'Deuce';
            return score;
        }

        if(this.P1point <= 3 && this.P2point <= 3){
            return `${SCORE[this.P1point]}-${SCORE[this.P2point]}`;
        }

        if ((this.P1point >= 4 || this.P2point >= 4) && Math.abs(this.P1point - this.P2point) >= 2) {
            return 'Win for ' + (this.P1point > this.P2point ? this.player1Name : this.player2Name);
        }

        if (Math.min(this.P2point, this.P1point) >= 3) {
            return 'Advantage ' + (this.P1point > this.P2point ? this.player1Name : this.player2Name);
        }

        return score;
    }

    SetP1Score(score: number): void {
        for (let i = 0; i < score; i++) {
            this.P1Score();
        }
    }

    SetP2Score(score: number): void {
        for (let i = 0; i < score; i++) {
            this.P2Score();
        }
    }

    P1Score(): void {
        this.P1point++;
    }

    P2Score(): void {
        this.P2point++;
    }

    wonPoint(player: string): void {
        if (player === this.player1Name)
            this.P1Score();
        else
            this.P2Score();
    }
}