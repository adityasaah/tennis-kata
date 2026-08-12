import { TennisGame } from './TennisGame.interface';

const EQUAL_SCORE_NAMES: Record<number, string> = {
    0: 'Love-All',
    1: 'Fifteen-All',
    2: 'Thirty-All',
    3: 'Deuce'
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
        if (this.m_score1 >= 4 || this.m_score2 >= 4) {
            if(this.m_score1 === this.m_score2){
                return 'Deuce';
            }
            return this.finalScoreWhenOnePlayerHaveAtLeastFourPoints();
        }
        else if (this.m_score1 === this.m_score2) {
            return EQUAL_SCORE_NAMES[this.m_score1];
        }
        return this.finalScoreForDefaultCase();
    }

    private finalScoreForDefaultCase() {
        let score: string = "";
        let tempScore: number = 0;
        for (let i = 1; i < 3; i++) {
            if (i === 1) tempScore = this.m_score1;
            else {
                score += '-';
                tempScore = this.m_score2;
            }
            switch (tempScore) {
                case 0:
                    score += 'Love';
                    break;
                case 1:
                    score += 'Fifteen';
                    break;
                case 2:
                    score += 'Thirty';
                    break;
                case 3:
                    score += 'Forty';
                    break;
            }
        }
        return score;
    }

    private finalScoreWhenOnePlayerHaveAtLeastFourPoints() {
        const minusResult: number = this.m_score1 - this.m_score2;
        if (minusResult === 1) return 'Advantage player1';
        else if (minusResult === -1) return 'Advantage player2';
        else if (minusResult >= 2) return 'Win for player1';
        else return 'Win for player2';
    }


}