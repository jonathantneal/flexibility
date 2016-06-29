# margin-cross

The `margin-cross` method calculates the numerical length of flex item margins set to `"auto"` along the cross axis.

```js
marginCross( line )
```

### Specification

1. Let `count` be `0`.
-  For each `child` in `line.children`;
	1. If `child.cross-before` is `auto`;
		1. Increment `count` by `1`.
	-  If `child.cross-after` is `auto`;
		1. Increment `count` by `1`.
1. If `count` is greater than `0`;
	1. For each `child` in `line.children`;
		1. If `child.cross-before` is `auto`;
			1. Let `child.cross-before` be the `line.cross-space` divided by `count`.
			1. Let `child.cross-around` be itself and `child.cross-before`.
		-  If `child.cross-after` is `auto`;
			1. Let `child.cross-after` be the `line.cross-space` divided by `count`.
			1. Let `child.cross-around` be itself and `child.cross-after`.
	-  Let `line.cross-space` be `0`.

[Implementation](index.js) [Tests](test.js)
