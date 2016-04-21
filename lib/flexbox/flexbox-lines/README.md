# flexbox-lines

The `flexbox-lines` method calculates the lengths of lines in a flex container.

```js
flexboxLines( target )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/

1. Perform `flex-direction( target, target.flex-direction, target.align-items )`.
-  Perform `order( target )`.
-  Let `target.lines` be an `Array`.
-  Let `line` be an `Object` in `target.lines` containing; `line.main` as `0`, `line.cross` as `0`, and `line-children` as an `Array`.
-  For each `child` in `target.children`;
	1. If `target.flex-wrap` is `"no-wrap"`, or;
	   if `line.children` has a length of `0`, or;
	   if `target.main-around` is greater than or equal to `line.main` and `child.main-around`;
		1. Let `line.main` be itself and `child.main-around`.
		-  Let `line.cross` be the `Math.max` of itself or `child.cross-around`.
	-  Otherwise;
		1. Let `line` be an `Object` in `target.lines` containing; `line.main` as `child.main-around`, `line.cross` as `child.cross-around`, and `line-children` as an `Array`.
	-  Let `child` be a child of `line.children`.

[Implementation](index.js) [Tests](test.js)
