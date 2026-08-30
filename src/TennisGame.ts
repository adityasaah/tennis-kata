import { TennisGame } from './TennisGame.interface';

const TENNIS_SCORE: Record<number, string> = {
    0: `Love`,
    1: `Fifteen`,
    2: `Thirty`,
    3: `Forty`
};

export class TennisGame1 implements TennisGame {
    private m_score1: number = 0;
    private m_score2: number = 0;
    private readonly player1Name: string;
    private readonly player2Name: string;

    constructor(player1Name: string, player2Name: string) {
        this.player1Name = player1Name;
        this.player2Name = player2Name;
    }

    wonPoint(playerName: string): void {
        if (playerName === 'player1')
            this.m_score1 += 1;
        else
            this.m_score2 += 1;
    }

    getScore(): string {
        if(this.isScoreEqual()){
            return this.calculateEqualScore();
        }
        if(this.isScoreGreaterThanThree()) {
            return this.calculateScoreGreaterThanFour();
        }
        return this.calculateScoreForDefaultCase();
    }


    private calculateScoreGreaterThanFour() {
        let minusResult: number = this.getMinusResult();
        const player = this.getPlayer(minusResult);
        minusResult = Math.abs(minusResult);
        return this.calculateScoreWhenOnePlayerHaveScore4(minusResult, player);
    }

    private calculateEqualScore() {
        if (this.m_score1 >= 3) return 'Deuce';
        return `${TENNIS_SCORE[this.m_score1]}-All`
    }

    private calculateScoreForDefaultCase() {
        return `${TENNIS_SCORE[this.m_score1]}-${TENNIS_SCORE[this.m_score2]}`;
    }

    private isScoreGreaterThanThree() {
        return this.m_score1 >= 4 || this.m_score2 >= 4;
    }

    private isScoreEqual() {
        return this.m_score1 === this.m_score2;
    }

    private calculateScoreWhenOnePlayerHaveScore4(minusResult: number, player: string) {
        return minusResult === 1 ? `Advantage ${player}` : `Win for ${player}`;
    }

    private getPlayer(minusResult: number) {
        return minusResult > 0 ? this.player1Name : this.player2Name;
    }

    private getMinusResult() {
        return this.m_score1 - this.m_score2;
    }
}