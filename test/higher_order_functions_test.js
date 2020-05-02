const assert = require('assert');
const _ = require('lodash');

const utils = require('../index');

describe('Higher Order functions', () => {

    xit('myArrayFilter', done => {

        const arr = [1, 2, 3, 4, 5];

        assert(_.isEqual(
            utils.myArrayFilter(arr, v => v % 2 === 1),
            [1, 3, 5])
        );

        assert(_.isEqual(
            utils.myArrayFilter(arr, (v, i) => v * i % 2 === 0),
            [1, 2, 3, 4, 5])
        );

        done();

    });

    xit('myArrayReduce', done => {

        const arr = [1, 2, 3, 4, 5];

        let add = (a, b) => a + b;

        assert(utils.myArrayReduce(arr, add) === 15);
        assert(utils.myArrayReduce(arr, add, 0) === 15);

        done();

    });

    const tree = {
        type: 'in',
        value: 1,
        left: {
            type: 'end',
            value: 2
        },
        right: {
            type: 'in',
            value: 3,
            left: {
                type: 'end',
                value: 4
            },
            right: {
                type: 'end',
                value: 5
            }
        }
    };

    xit('myTreeReduce', done => {

        const add = (a, b, c) => a + b + c;

        const treeReduce = utils.myTreeReduce(add, x => x);

        assert(treeReduce(tree) === 15);

        done();

    });

    xit('myTreeSize', done => {

        const treeSize = utils.myTreeSize;

        assert(treeSize(tree) === 5);

        done();

    });

    xit('myTreeTraversal', done => {

        const treeTraversal = utils.myTreeTraversal;

        assert(_.isEqual(treeTraversal('pre')(tree), [1, 2, 3, 4, 5]));
        assert(_.isEqual(treeTraversal('in')(tree), [2, 1, 4, 3, 5]));
        assert(_.isEqual(treeTraversal('post')(tree), [2, 4, 5, 3, 1]));

        done();

    });

});