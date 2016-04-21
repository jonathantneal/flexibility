import test from 'ava';
import perform from './';

var target = {};

test('Test "flexibility" function', function (t) {
	t.is(perform(target), target);
});
