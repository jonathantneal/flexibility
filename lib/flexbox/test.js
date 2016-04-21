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
			flexGrow: 0,
			flexShrink: 1,
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
			flexGrow: 0,
			flexShrink: 1,
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
			flexGrow: 0,
			flexShrink: 1,
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
			flexGrow: 0,
			flexShrink: 1,
			width:  400,
			height: 200,
			marginTop:    0,
			marginRight:  0,
			marginBottom: 0,
			marginLeft:   0
		}
	]
};

test('Test "flexbox" function', function (t) {
	perform(target);

	t.pass();
});
