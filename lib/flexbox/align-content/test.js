import test from 'ava';
import perform from './';

var target = {
	cross: 400,
	crossSpace: 100,
	lines: [
		{
			cross: 100,
			crossStart: 0,
			children: [
				{
					cross: 50,
					crossStart: 0
				},
				{
					cross: 100,
					crossStart: 0
				}
			]
		},
		{
			cross: 200,
			crossStart: 100,
			children: [
				{
					cross: 150,
					crossStart: 100
				},
				{
					cross: 200,
					crossStart: 100
				}
			]
		}
	]
};

var target1 = target.lines[0].children[0];
var target2 = target.lines[0].children[1];
var target3 = target.lines[1].children[0];
var target4 = target.lines[1].children[1];

test('Test "align-content" as "flex-start"', function (t) {
	target.alignContent = 'flex-start'; target1.crossStart = 0;
	target.alignContent = 'flex-start'; target2.crossStart = 0;
	target.alignContent = 'flex-start'; target3.crossStart = 100;
	target.alignContent = 'flex-start'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 0);
	t.is(target2.crossStart, 0);
	t.is(target3.crossStart, 100);
	t.is(target4.crossStart, 100);
});

test('Test "align-content" as "flex-end"', function (t) {
	target.alignContent = 'flex-end'; target1.crossStart = 0;
	target.alignContent = 'flex-end'; target2.crossStart = 0;
	target.alignContent = 'flex-end'; target3.crossStart = 100;
	target.alignContent = 'flex-end'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 100);
	t.is(target2.crossStart, 100);
	t.is(target3.crossStart, 200);
	t.is(target4.crossStart, 200);
});

test('Test "align-content" as "center"', function (t) {
	target.alignContent = 'center'; target1.crossStart = 0;
	target.alignContent = 'center'; target2.crossStart = 0;
	target.alignContent = 'center'; target3.crossStart = 100;
	target.alignContent = 'center'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 50);
	t.is(target2.crossStart, 50);
	t.is(target3.crossStart, 150);
	t.is(target4.crossStart, 150);
});

test('Test "align-content" as "space-between"', function (t) {
	target.alignContent = 'space-between'; target1.crossStart = 0;
	target.alignContent = 'space-between'; target2.crossStart = 0;
	target.alignContent = 'space-between'; target3.crossStart = 100;
	target.alignContent = 'space-between'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 0);
	t.is(target2.crossStart, 0);
	t.is(target3.crossStart, 200);
	t.is(target4.crossStart, 200);
});

test('Test "align-content" as "space-around"', function (t) {
	target.alignContent = 'space-around'; target1.crossStart = 0;
	target.alignContent = 'space-around'; target2.crossStart = 0;
	target.alignContent = 'space-around'; target3.crossStart = 100;
	target.alignContent = 'space-around'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 33.333333333333336);
	t.is(target2.crossStart, 33.333333333333336);
	t.is(target3.crossStart, 133.33333333333334);
	t.is(target4.crossStart, 133.33333333333334);
});

test('Test "align-content" as "stretch"', function (t) {
	target.alignContent = 'stretch'; target1.crossStart = 0;
	target.alignContent = 'stretch'; target2.crossStart = 0;
	target.alignContent = 'stretch'; target3.crossStart = 100;
	target.alignContent = 'stretch'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 0);
	t.is(target1.cross, 150);
	t.is(target2.crossStart, 0);
	t.is(target2.cross, 150);
	t.is(target3.crossStart, 150);
	t.is(target3.cross, 250);
	t.is(target4.crossStart, 150);
	t.is(target4.cross, 250);
});
