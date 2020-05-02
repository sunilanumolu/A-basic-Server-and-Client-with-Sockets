const assert = require('assert');
const _ = require('lodash');

const utils = require('../index');

describe('closures', () => {

    xit('hangman', done => {

        let game = utils.hangman('work');
        assert(game('w') === 'w _ _ _');
        assert(game('h') === "Incorrect guess!!!");
        assert(game('r') === 'w _ r _');
        assert(game('o') === 'w o r _');
        assert(game('d') === "Incorrect guess!!!");
        assert(game('k') === "You've got it!!! Final phrase: work");
        assert(game('s') === "Game over!!!");

        game = utils.hangman('tree');
        assert(game('r') === '_ r _ _');
        assert(game('a') === "Incorrect guess!!!");
        assert(game('s') === "Incorrect guess!!!");
        assert(game('i') === "You've lost!!! Correct phrase: tree");
        assert(game('t') === "Game over!!!");

        done();

    });

});