import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			mainSpace: 250,
			children: [
				{
					flexGrow: 0,
					main: 50
				},
				{
					flexGrow: 0,
					main: 100
				}
			]
		},
		{
			mainSpace: 50,
			children: [
				{
					flexGrow: 0,
					main: 150
				},
				{
					flexGrow: 0,
					main: 200
				}
			]
		}
	]
};

var target1 = target.lines[0].children[0];
var target2 = target.lines[0].children[1];
var target3 = target.lines[1].children[0];
var target4 = target.lines[1].children[1];

test('Test "flex-grow" on all as 0', function (t) {
	target1.flexGrow = 0; target1.main = 50;
	target2.flexGrow = 0; target2.main = 100;
	target3.flexGrow = 0; target3.main = 150;
	target4.flexGrow = 0; target4.main = 200;

	target.lines.forEach(perform);

	t.is(target1.main, 50);
	t.is(target2.main, 100);

	t.is(target3.main, 150);
	t.is(target4.main, 200);
});

test('Test "flex-grow" on odds as 1', function (t) {
	target1.flexGrow = 1; target1.main = 50;
	target2.flexGrow = 0; target2.main = 100;
	target3.flexGrow = 1; target3.main = 150;
	target4.flexGrow = 0; target4.main = 200;

	target.lines.forEach(perform);

	t.is(target1.main, 300);
	t.is(target2.main, 100);

	t.is(target3.main, 200);
	t.is(target4.main, 200);
});

test('Test "flex-grow" on evens as 1', function (t) {
	target1.flexGrow = 0; target1.main = 50;
	target2.flexGrow = 1; target2.main = 100;
	target3.flexGrow = 0; target3.main = 150;
	target4.flexGrow = 1; target4.main = 200;

	target.lines.forEach(perform);

	t.is(target1.main, 50);
	t.is(target2.main, 350);

	t.is(target3.main, 150);
	t.is(target4.main, 250);
});

test('Test "flex-grow" on all as 1', function (t) {
	target1.flexGrow = 1; target1.main = 50;
	target2.flexGrow = 1; target2.main = 100;
	target3.flexGrow = 1; target3.main = 150;
	target4.flexGrow = 1; target4.main = 200;

	target.lines.forEach(perform);

	t.is(target1.main, 175);
	t.is(target2.main, 225);

	t.is(target3.main, 175);
	t.is(target4.main, 225);
});
