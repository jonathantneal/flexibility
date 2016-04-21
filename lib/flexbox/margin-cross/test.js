import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			crossSpace: 100,
			children: [
				{
					crossBefore: 0,
					crossAfter: 0
				},
				{
					crossBefore: 0,
					crossAfter: 0
				}
			]
		},
		{
			crossSpace: 100,
			children: [
				{
					crossBefore: 0,
					crossAfter: 0
				},
				{
					crossBefore: 0,
					crossAfter: 0
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
	target.lines[0].crossSpace = 100; target.lines[1].crossSpace = 100;
	target1.crossBefore = 0; target1.crossAfter = 0;
	target2.crossBefore = 0; target2.crossAfter = 0;
	target3.crossBefore = 0; target3.crossAfter = 0;
	target4.crossBefore = 0; target4.crossAfter = 0;

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.crossBefore, 0); t.is(target1.crossAfter, 0);
	t.is(target2.crossBefore, 0); t.is(target2.crossAfter, 0);

	t.is(target3.crossBefore, 0); t.is(target3.crossAfter, 0);
	t.is(target4.crossBefore, 0); t.is(target4.crossAfter, 0);
});

test('Test "margin-before" on odds as "auto"', function (t) {
	target.lines[0].crossSpace = 100; target.lines[1].crossSpace = 100;
	target1.crossBefore = 'auto'; target1.crossAfter = 0;
	target2.crossBefore = 0; target2.crossAfter = 0;
	target3.crossBefore = 'auto'; target3.crossAfter = 0;
	target4.crossBefore = 0; target4.crossAfter = 0;

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.crossBefore, 100); t.is(target1.crossAfter, 0);
	t.is(target2.crossBefore, 0); t.is(target2.crossAfter, 0);

	t.is(target3.crossBefore, 100); t.is(target3.crossAfter, 0);
	t.is(target4.crossBefore, 0); t.is(target4.crossAfter, 0);
});

test('Test "margin-after" on evens as "auto"', function (t) {
	target.lines[0].crossSpace = 100; target.lines[1].crossSpace = 100;
	target1.crossBefore = 0; target1.crossAfter = 0;
	target2.crossBefore = 0; target2.crossAfter = 'auto';
	target3.crossBefore = 0; target3.crossAfter = 0;
	target4.crossBefore = 0; target4.crossAfter = 'auto';

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.crossBefore, 0); t.is(target1.crossAfter, 0);
	t.is(target2.crossBefore, 0); t.is(target2.crossAfter, 100);

	t.is(target3.crossBefore, 0); t.is(target3.crossAfter, 0);
	t.is(target4.crossBefore, 0); t.is(target4.crossAfter, 100);
});

test('Test "margin" on all as "auto"', function (t) {
	target.lines[0].crossSpace = 100; target.lines[1].crossSpace = 100;
	target1.crossBefore = 'auto'; target1.crossAfter = 'auto';
	target2.crossBefore = 'auto'; target2.crossAfter = 'auto';
	target3.crossBefore = 'auto'; target3.crossAfter = 'auto';
	target4.crossBefore = 'auto'; target4.crossAfter = 'auto';

	target.lines.forEach(function (line) {
		perform(line);
	});

	t.is(target1.crossBefore, 25); t.is(target1.crossAfter, 25);
	t.is(target2.crossBefore, 25); t.is(target2.crossAfter, 25);

	t.is(target3.crossBefore, 25); t.is(target3.crossAfter, 25);
	t.is(target4.crossBefore, 25); t.is(target4.crossAfter, 25);
});
