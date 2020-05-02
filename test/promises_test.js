const assert = require('assert');
const _ = require('lodash');

const utils = require('../index');

describe('Promises', () => {

    xit('carRace', done => {

        const ferrari = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    name: 'Ferrari',
                    time: 10
                });
            }, 10);
        });

        const bugati = new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    name: 'Bugatti',
                    time: 8
                });
            }, 8);
        });

        utils.carRace([ferrari, bugati], win => {
            assert(win === 'Bugatti won in 8 seconds!!!');
            done();
        });

    });

});
