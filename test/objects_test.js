const assert = require('assert');
const _ = require('lodash');

const utils = require('../index');

describe('objects', () => {

    xit('getter & setter', done => {

        const numberList  = utils.numberList;

        numberList.add = 1;
        assert(numberList.sum === 1);

        numberList.add = 2;
        assert(numberList.sum === 3);
        assert(numberList.average === 1.5);

        numberList.add = 3;
        assert(numberList.average === 2);

        numberList.numbers.push(0);
        assert(numberList.sum === 6);
        assert(numberList.average === 1.5);

        done();

    });

    xit('Person & Student', done => {

        const person = new utils.Person('John', 20);
        assert(person.name === 'John');
        assert(person.age = 20);
        assert(person.about() === 'My name is John and I\'m 20 yrs old.');

        const student = new utils.Student('John', 20, '20171065');
        assert(student.name === 'John');
        assert(student.age = 20);
        assert(student.about() === 'My name is John and I\'m 20 yrs old.');
        assert(student.id() === 'Student Id: 20171065');

        done();

    });

});