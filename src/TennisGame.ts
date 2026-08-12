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
    private player1Name: string;
    private player2Name: string;

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
        if(this.m_score1 === this.m_score2){
            if(this.m_score1 >= 3) return 'Deuce';
            return `${TENNIS_SCORE[this.m_score1]}-All`
        }
        if(this.m_score1 >= 4 || this.m_score2 >= 4) {
            const minusResult: number = this.m_score1 - this.m_score2;
            return this.finalScoreWhenOnePlayerHaveAtLeastFourPoints(minusResult);
        }
        return `${TENNIS_SCORE[this.m_score1]}-${TENNIS_SCORE[this.m_score2]}`;
    }
    private finalScoreWhenOnePlayerHaveAtLeastFourPoints(minusResult: number) {
        if (minusResult === 1) return 'Advantage player1';
        else if (minusResult === -1) return 'Advantage player2';
        else if (minusResult >= 2) return 'Win for player1';
        else return 'Win for player2';
    }


}