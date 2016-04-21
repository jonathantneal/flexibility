import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			mainSpace: 100,
			children: [
				{
					mainBefore: 0,
					mainAfter: 0
				},
				{
					mainBefore: 0,
					mainAfter: 0
				}
			]
		},
		{
			mainSpace: 100,
			children: [
				{
					mainBefore: 0,
					mainAfter: 0
				},
				{
					mainBefore: 0,
					mainAfter: 0
				}
			]
		}
	]
};

var target1 = target.lines[0].children[0];
var target2 = target.lines[0].children[1];
var target3 = target.lines[1].children[0];
var target4 = target.lines[1].children[1];

test('Test "margin" on all as 0', function (t) {
	target.lines[0].mainSpace = 100;
	target.lines[1].mainSpace = 100;

	target1.mainBefore = 0; target1.mainAfter = 0;
	target2.mainBefore = 0; target2.mainAfter = 0;
	target3.mainBefore = 0; target3.mainAfter = 0;
	target4.mainBefore = 0; target4.mainAfter = 0;

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.mainBefore, 0); t.is(target1.mainAfter, 0);
	t.is(target2.mainBefore, 0); t.is(target2.mainAfter, 0);

	t.is(target3.mainBefore, 0); t.is(target3.mainAfter, 0);
	t.is(target4.mainBefore, 0); t.is(target4.mainAfter, 0);
});

test('Test "margin-before" on odds as "auto"', function (t) {
	target.lines[0].mainSpace = 100;
	target.lines[1].mainSpace = 100;

	target1.mainBefore = 'auto'; target1.mainAfter = 0;
	target2.mainBefore = 0; target2.mainAfter = 0;
	target3.mainBefore = 'auto'; target3.mainAfter = 0;
	target4.mainBefore = 0; target4.mainAfter = 0;

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.mainBefore, 100); t.is(target1.mainAfter, 0);
	t.is(target2.mainBefore, 0); t.is(target2.mainAfter, 0);

	t.is(target3.mainBefore, 100); t.is(target3.mainAfter, 0);
	t.is(target4.mainBefore, 0); t.is(target4.mainAfter, 0);
});

test('Test "margin-after" on evens as "auto"', function (t) {
	target.lines[0].mainSpace = 100;
	target.lines[1].mainSpace = 100;

	target1.mainBefore = 0; target1.mainAfter = 0;
	target2.mainBefore = 0; target2.mainAfter = 'auto';
	target3.mainBefore = 0; target3.mainAfter = 0;
	target4.mainBefore = 0; target4.mainAfter = 'auto';

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.mainBefore, 0); t.is(target1.mainAfter, 0);
	t.is(target2.mainBefore, 0); t.is(target2.mainAfter, 100);

	t.is(target3.mainBefore, 0); t.is(target3.mainAfter, 0);
	t.is(target4.mainBefore, 0); t.is(target4.mainAfter, 100);
});

test('Test "margin" on all as "auto"', function (t) {
	target.lines[0].mainSpace = 100;
	target.lines[1].mainSpace = 100;

	target1.mainBefore = 'auto'; target1.mainAfter = 'auto';
	target2.mainBefore = 'auto'; target2.mainAfter = 'auto';
	target3.mainBefore = 'auto'; target3.mainAfter = 'auto';
	target4.mainBefore = 'auto'; target4.mainAfter = 'auto';

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.mainBefore, 25); t.is(target1.mainAfter, 25);
	t.is(target2.mainBefore, 25); t.is(target2.mainAfter, 25);

	t.is(target3.mainBefore, 25); t.is(target3.mainAfter, 25);
	t.is(target4.mainBefore, 25); t.is(target4.mainAfter, 25);
});
