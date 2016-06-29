# align-items

The `align-self` method calculates the position of flex items along the cross axis.

```js
alignItems( target )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-align-items

1. For each `line` in `target.lines`;
	1. For each `child` in `line.children`;
		-  If `child.align-self` is `"flex-start"`;
			1. Let `child.cross-start` be itself.
		-  Otherwise, if `child.align-self` is `"flex-end"`;
			1. Let `child.cross-start` be `line.cross-start` and `line.cross` sans `child.cross-around`.
		-  Otherwise, if `child.align-self` is `"center"`;
			1. Let `child.cross-start` be `line.cross-start` and; `line.cross` sans `child.cross-around`; divided by `2`.
		-  Otherwise, if `child.align-self` is `"stretch"`;
			1. Let `child.cross-start` be `line.cross-start`.
			-  Let `child.cross` be `line.cross`.

[Implementation](index.js) [Tests](test.js)
