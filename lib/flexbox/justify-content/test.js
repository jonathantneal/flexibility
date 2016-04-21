import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			mainSpace: 100,
			children: [
				{
					main: 100
				},
				{
					main: 300
				}
			]
		},
		{
			mainSpace: 100,
			children: [
				{
					main: 200
				},
				{
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

test('Test "justify-content" as "flex-start"', function (t) {
	target.justifyContent = 'flex-start';
	target1.main = 100; delete target1.mainStart;
	target2.main = 300; delete target2.mainStart;
	target3.main = 200; delete target3.mainStart;
	target4.main = 200; delete target4.mainStart;

	target.lines.forEach(function (line) {
		perform(line, target.justifyContent);
	});

	t.is(target1.mainStart, 0);
	t.is(target2.mainStart, 100);

	t.is(target3.mainStart, 0);
	t.is(target4.mainStart, 200);
});

test('Test "justify-content" as "flex-end"', function (t) {
	target.justifyContent = 'flex-end';
	target1.main = 100; delete target1.mainStart;
	target2.main = 300; delete target2.mainStart;
	target3.main = 200; delete target3.mainStart;
	target4.main = 200; delete target4.mainStart;

	target.lines.forEach(function (line) {
		perform(line, target.justifyContent);
	});

	t.is(target1.mainStart, 100);
	t.is(target2.mainStart, 200);

	t.is(target3.mainStart, 100);
	t.is(target4.mainStart, 300);
});

test('Test "justify-content" as "center"', function (t) {
	target.justifyContent = 'center';
	target1.main = 100; delete target1.mainStart;
	target2.main = 300; delete target2.mainStart;
	target3.main = 200; delete target3.mainStart;
	target4.main = 200; delete target4.mainStart;

	target.lines.forEach(function (line) {
		perform(line, target.justifyContent);
	});

	t.is(target1.mainStart, 50);
	t.is(target2.mainStart, 150);

	t.is(target3.mainStart, 50);
	t.is(target4.mainStart, 250);
});

test('Test "justify-content" as "space-between"', function (t) {
	target.justifyContent = 'space-between';
	target1.main = 100; delete target1.mainStart;
	target2.main = 300; delete target2.mainStart;
	target3.main = 200; delete target3.mainStart;
	target4.main = 200; delete target4.mainStart;

	target.lines.forEach(function (line) {
		perform(line, target.justifyContent);
	});

	t.is(target1.mainStart, 0);
	t.is(target2.mainStart, 200);

	t.is(target3.mainStart, 0);
	t.is(target4.mainStart, 300);
});

test('Test "justify-content" as "space-around"', function (t) {
	target.justifyContent = 'space-around';
	target1.main = 100; delete target1.mainStart;
	target2.main = 300; delete target2.mainStart;
	target3.main = 200; delete target3.mainStart;
	target4.main = 200; delete target4.mainStart;

	target.lines.forEach(function (line) {
		perform(line, target.justifyContent);
	});

	t.is(target1.mainStart, 33.333333333333336);
	t.is(target2.mainStart, 166.66666666666669);

	t.is(target3.mainStart, 33.333333333333336);
	t.is(target4.mainStart, 266.6666666666667);
});
