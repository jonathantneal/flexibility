import test from 'ava';
import perform from './';

var target = {
	lines: [
		{
			cross: 100,
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

test('Test "align-items" as "flex-start"', function (t) {
	target1.alignSelf = 'flex-start'; target1.crossStart = 0;
	target2.alignSelf = 'flex-start'; target2.crossStart = 0;
	target3.alignSelf = 'flex-start'; target3.crossStart = 100;
	target4.alignSelf = 'flex-start'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 0);
	t.is(target2.crossStart, 0);
	t.is(target3.crossStart, 100);
	t.is(target4.crossStart, 100);
});

test('Test "align-items" as "flex-end"', function (t) {
	target1.alignSelf = 'flex-end'; target1.crossStart = 0;
	target2.alignSelf = 'flex-end'; target2.crossStart = 0;
	target3.alignSelf = 'flex-end'; target3.crossStart = 100;
	target4.alignSelf = 'flex-end'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 50);
	t.is(target2.crossStart, 0);
	t.is(target3.crossStart, 150);
	t.is(target4.crossStart, 100);
});

test('Test "align-items" as "center"', function (t) {
	target1.alignSelf = 'center'; target1.crossStart = 0;
	target2.alignSelf = 'center'; target2.crossStart = 0;
	target3.alignSelf = 'center'; target3.crossStart = 100;
	target4.alignSelf = 'center'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 25);
	t.is(target2.crossStart, 0);
	t.is(target3.crossStart, 125);
	t.is(target4.crossStart, 100);
});

test('Test "align-items" as "strech"', function (t) {
	target1.alignSelf = 'stretch'; target1.crossStart = 0;
	target2.alignSelf = 'stretch'; target2.crossStart = 0;
	target3.alignSelf = 'stretch'; target3.crossStart = 100;
	target4.alignSelf = 'stretch'; target4.crossStart = 100;

	perform(target);

	t.is(target1.crossStart, 0);
	t.is(target1.cross,  100);
	t.is(target2.crossStart, 0);
	t.is(target2.cross,  100);
	t.is(target3.crossStart, 100);
	t.is(target3.cross,  200);
	t.is(target4.crossStart, 100);
	t.is(target4.cross,  200);
});
