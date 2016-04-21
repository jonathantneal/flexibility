import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			mainSpace: -100,
			children: [
				{
					flexShrink: 0,
					main: 200
				},
				{
					flexShrink: 0,
					main: 400
				}
			]
		},
		{
			mainSpace: -200,
			children: [
				{
					flexShrink: 0,
					main: 300
				},
				{
					flexShrink: 0,
					main: 400
				}
			]
		}
	]
};

var target1 = target.lines[0].children[0];
var target2 = target.lines[0].children[1];
var target3 = target.lines[1].children[0];
var target4 = target.lines[1].children[1];

test('Test "flex-shrink" on all as 0', function (t) {
	target1.flexShrink = 0; target1.main = 200;
	target2.flexShrink = 0; target2.main = 400;
	target3.flexShrink = 0; target3.main = 300;
	target4.flexShrink = 0; target4.main = 400;

	target.lines.forEach(perform);

	t.is(target1.main, 200);
	t.is(target2.main, 400);

	t.is(target3.main, 300);
	t.is(target4.main, 400);
});

test('Test "flex-shrink" on odds as 1', function (t) {
	target1.flexShrink = 1; target1.main = 200;
	target2.flexShrink = 0; target2.main = 400;
	target3.flexShrink = 1; target3.main = 300;
	target4.flexShrink = 0; target4.main = 400;

	target.lines.forEach(perform);

	t.is(target1.main, 100);
	t.is(target2.main, 400);

	t.is(target3.main, 100);
	t.is(target4.main, 400);
});

test('Test "flex-shrink" on evens as 1', function (t) {
	target1.flexShrink = 0; target1.main = 200;
	target2.flexShrink = 1; target2.main = 400;
	target3.flexShrink = 0; target3.main = 300;
	target4.flexShrink = 1; target4.main = 400;

	target.lines.forEach(perform);

	t.is(target1.main, 200);
	t.is(target2.main, 300);

	t.is(target3.main, 300);
	t.is(target4.main, 200);
});

test('Test "flex-shrink" on all as 1', function (t) {
	target1.flexShrink = 1; target1.main = 200;
	target2.flexShrink = 1; target2.main = 400;
	target3.flexShrink = 1; target3.main = 300;
	target4.flexShrink = 1; target4.main = 400;

	target.lines.forEach(perform);

	t.is(target1.main, 150);
	t.is(target2.main, 350);

	t.is(target3.main, 200);
	t.is(target4.main, 300);
});
