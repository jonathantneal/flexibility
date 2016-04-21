import test from 'ava';
import perform from './';

var target = {
	alignSelf: 'auto',
	flexBasis: 'auto',
	width:  400,
	height: 200,
	marginTop: 20,
	marginRight: 40,
	marginBottom: 60,
	marginLeft: 80,
	clientWidth: 0,
	clientHeight: 0
};

test('Test "flex-direction" as "row"', function (t) {
	target.alignSelf = 'auto';
	target.flexBasis = 'auto';

	perform(target, 'row', 'stretch');

	t.is(target.mainAxis, 'inline');
	t.is(target.crossAxis, 'block');
	t.is(target.main, 400);
	t.is(target.cross, 200);
	t.is(target.mainBefore, 80);
	t.is(target.mainAfter, 40);
	t.is(target.mainAround, 400 + 80 + 40);
	t.is(target.alignSelf, 'stretch');
});

test('Test "flex-direction" as "row-reverse"', function (t) {
	target.alignSelf = 'auto';
	target.flexBasis = 'auto';

	perform(target, 'row-reverse', 'stretch');

	t.is(target.mainAxis, 'inline');
	t.is(target.crossAxis, 'block');
	t.is(target.main, 400);
	t.is(target.cross, 200);
	t.is(target.mainBefore, 80);
	t.is(target.mainAfter, 40);
	t.is(target.mainAround, 400 + 80 + 40);
	t.is(target.alignSelf, 'stretch');
});

test('Test "flex-direction" as "column"', function (t) {
	target.alignSelf = 'auto';
	target.flexBasis = 'auto';

	perform(target, 'column', 'stretch');

	t.is(target.mainAxis, 'block');
	t.is(target.crossAxis, 'inline');
	t.is(target.main, 200);
	t.is(target.cross, 400);
	t.is(target.mainBefore, 20);
	t.is(target.mainAfter, 60);
	t.is(target.mainAround, 200 + 20 + 60);
	t.is(target.alignSelf, 'stretch');
});

test('Test "flex-direction" as "column-reverse"', function (t) {
	target.alignSelf = 'auto';
	target.flexBasis = 'auto';

	perform(target, 'column-reverse', 'stretch');

	t.is(target.mainAxis, 'block');
	t.is(target.crossAxis, 'inline');
	t.is(target.main, 200);
	t.is(target.cross, 400);
	t.is(target.mainBefore, 20);
	t.is(target.mainAfter, 60);
	t.is(target.mainAround, 200 + 20 + 60);
	t.is(target.alignSelf, 'stretch');
});

test('Test "flex-direction" as "row" and "flex-basis" as 100', function (t) {
	target.alignSelf = 'auto';
	target.flexBasis = 100;

	perform(target, 'row', 'stretch');

	t.is(target.mainAxis, 'inline');
	t.is(target.crossAxis, 'block');
	t.is(target.main, 100);
	t.is(target.cross, 200);
	t.is(target.mainBefore, 80);
	t.is(target.mainAfter, 40);
	t.is(target.mainAround, 100 + 80 + 40);
	t.is(target.alignSelf, 'stretch');
});

test('Test "flex-direction" as "row" and "align-self" as "flex-start"', function (t) {
	target.alignSelf = 'flex-start';
	target.flexBasis = 'auto';

	perform(target, 'row', 'stretch');

	t.is(target.mainAxis, 'inline');
	t.is(target.crossAxis, 'block');
	t.is(target.main, 400);
	t.is(target.cross, 200);
	t.is(target.mainBefore, 80);
	t.is(target.mainAfter, 40);
	t.is(target.mainAround, 400 + 80 + 40);
	t.is(target.alignSelf, 'flex-start');
});
