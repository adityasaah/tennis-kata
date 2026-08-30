import * as fs from 'fs';
import * as path from 'path';
import {TennisGame1} from '../src/TennisGame';
import {TennisGame} from '../src/TennisGame.interface';
import {describe, expect, it} from "vitest";

function getAllScores(): Array<[number, number, string]> {
    const testCases = path.resolve(__dirname, 'scores.json');
    const scoreData = fs.readFileSync(testCases).toString();
    const scores = JSON.parse(scoreData);
    return JSON.parse(JSON.stringify(scores));
}

const scores: Array<[number, number, string]> = getAllScores();

function checkScore(game: TennisGame, player1Score: number, player2Score: number, expectedScore: string): void {
    const highestScore: number = Math.max(player1Score, player2Score);
    for (let i = 0; i < highestScore; i++) {
        if (i < player1Score) {
            game.wonPoint('player1');
        }
        if (i < player2Score) {
            game.wonPoint('player2');
        }
    }
    expect(game.getScore()).toBe(expectedScore);
}

describe('TennisGame', function () {
    describe('TennisGame1', function () {
        scores.forEach(([player1Score, player2Score, expectedScore]) => {
            it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, function () {
                checkScore(new TennisGame1('player1', 'player2'), player1Score, player2Score, expectedScore);
            });
        });

        it('uses constructor player names in score output for Alice and Bob', function () {
            const game = new TennisGame1('Alice', 'Bob');
            for (let i = 0; i < 4; i++) game.wonPoint('Alice');
            for (let i = 0; i < 2; i++) game.wonPoint('Bob');
            expect(game.getScore()).toBe('Win for Alice');
        });
    });
});