# align-content

The `align-content` method calculates the position of flex lines along the cross axis.

```js
alignContent( target, target.alignContent )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-align-content

1. If the count of `target.lines` is less than `2`, or;
   if `target.align-content` is `"stretch"`;
	1. Let `factor` be `target.cross-space` divided by the length of `target.lines`.
	-  Let `start` be `0`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `line.cross` be itself and `factor`.
		-  Let `start` be itself and `line.cross`.
-  If `target.align-content` is `"flex-start"`;
	1. Let `start` be `0`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `start` be itself and `line.cross`.
-  If `target.align-content` is `"flex-end"`;
	1. Let `start` be `target.cross-space`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `start` be itself and `line.cross`.
-  If `target.align-content` is `"center"`;
	1. Let `start` be `target.cross-space` divided by `2`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `start` be itself and `line.cross`.
-  If `target.align-content` is `"space-between"`;
	1. Let `factor` be `target.cross-space` divided by; the length of `lines` sans `1`.
	-  Let `start` be `0`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `start` be itself and `line.cross` and `factor`.
-  If `target.align-content` is `"space-around"`;
	1. Let `factor` be `target.cross-space` multiplied by `2` divided by; the length of `lines` multiplied by `2`.
	-  Let  `start` be `factor` divided by `2`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Let `start` be itself and `line.cross` and `factor`.
-  If `target.align-content` is `"stretch"`;
	1. Let `factor` be `target.cross-space` divided by the length of `target.lines`.
	1. Let `start` be `0`.
	-  For each `line` in `target.lines`;
		1. Let `line.cross-start` be `start`.
		-  Line `line.cross` be `factor`.
		-  Let `start` be itself and `line.cross` and `factor`.

[Implementation](index.js) [Tests](test.js)
