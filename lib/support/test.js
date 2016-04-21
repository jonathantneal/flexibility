import test from 'ava';
import perform from './';

test('Test "support" function', function (t) {
	t.is(perform({
		style: {}
	}), true);
});
