import { TennisGame } from './TennisGame';

export class TennisGame3 implements TennisGame {
    private TennisScore: string[] = ['Love', 'Fifteen', 'Thirty', 'Forty'];

    private player2Score: number;
    private player1Score: number;
    private player1Name: string;
    private player2Name: string;


    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
        this.player1Score = 0;
        this.player2Score = 0;
    }

    getScore(): string {
        if (this.player1Score === this.player2Score) {
            return this.getTieScore();
        }
        let s: string;
        if (this.player1Score < 4 && this.player2Score < 4 && !(this.player1Score + this.player2Score === 6)) {
            s = this.TennisScore[this.player1Score];
            return (this.player1Score === this.player2Score) ? s + '-All' : s + '-' + this.TennisScore[this.player2Score];
        } else {
            s = this.player1Score > this.player2Score ? this.player1Name : this.player2Name;
            return (((this.player1Score - this.player2Score) * (this.player1Score - this.player2Score)) === 1) ? 'Advantage ' + s : 'Win for ' + s;
        }
    }

    private getTieScore() {
        if (this.player1Score >= 3) return 'Deuce'
        return `${this.TennisScore[this.player1Score]}-All`;
    }

    wonPoint(playerName: string): void {
        if (playerName === this.player1Name)
            this.player1Score += 1;
        else
            this.player2Score += 1;
    }
}