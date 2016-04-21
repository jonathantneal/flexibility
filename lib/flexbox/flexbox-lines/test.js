import test from 'ava';
import perform from './';

var target = {
	alignItems: 'stretch',
	flexDirection: 'row',
	wrap: 'nowrap',
	width:  600,
	height: 'auto',
	marginTop:    0,
	marginRight:  0,
	marginLeft:   0,
	marginBottom: 0,
	children: [
		{
			alignSelf: 'auto',
			flexBasis: 'auto',
			width:  200,
			height: 400,
			marginTop:    0,
			marginRight:  0,
			marginBottom: 0,
			marginLeft:   0
		},
		{
			alignSelf: 'auto',
			flexBasis: 'auto',
			width:  400,
			height: 200,
			marginTop:    0,
			marginRight:  0,
			marginBottom: 0,
			marginLeft:   0
		},
		{
			alignSelf: 'auto',
			flexBasis: 'auto',
			width:  600,
			height: 400,
			marginTop:    0,
			marginRight:  0,
			marginBottom: 0,
			marginLeft:   0
		},
		{
			alignSelf: 'flex-start',
			flexBasis: 'auto',
			width:  400,
			height: 200,
			marginTop:    0,
			marginRight:  0,
			marginBottom: 0,
			marginLeft:   0
		}
	]
};

test('Test "flex-lines" function', function (t) {
	perform(target);

	t.pass();
});

test('Test "flex-lines" line count', function (t) {
	t.is(target.lines.length, 3);
});

test('Test "flex-lines" items count', function (t) {
	t.is(target.lines[0].children.length, 2);
	t.is(target.lines[1].children.length, 1);
	t.is(target.lines[2].children.length, 1);
});

test('Test "flex-lines" line length', function (t) {
	t.is(target.lines[0].main, 600);
	t.is(target.lines[0].cross, 400);
	t.is(target.lines[1].main, 600);
	t.is(target.lines[1].cross, 400);
	t.is(target.lines[2].main, 400);
	t.is(target.lines[2].cross, 200);
});

test('Test "flex-lines" items "align-self"', function (t) {
	t.is(target.children[0].alignSelf, 'stretch');
	t.is(target.children[1].alignSelf, 'stretch');
	t.is(target.children[2].alignSelf, 'stretch');
	t.is(target.children[3].alignSelf, 'flex-start');
});
