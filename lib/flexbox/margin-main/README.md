# margin-main

The `margin-main` method calculates the numerical length of flex item margins set to `"auto"` along the main axis.

```js
marginCross( line )
```

### Specification

1. Let `count` be `0`.
-  For each `child` in `line.children`;
	1. If `child.main-before` is `auto`;
		1. Increment `count` by `1`.
	-  If `child.main-after` is `auto`;
		1. Increment `count` by `1`.
1. If `count` is greater than `0`;
	1. For each `child` in `line.children`;
		1. If `child.main-before` is `auto`;
			1. Let `child.main-before` be the `line.main-space` divided by `count`.
			1. Let `child.main-around` be itself and `child.main-before`.
		+  If `child.main-after` is `auto`;
			1. Let `child.main-after` be the `line.main-space` divided by `count`.
			1. Let `child.main-around` be itself and `child.main-after`.
	+  Let `line.main-space` be `0`.

[Implementation](index.js) [Tests](test.js)
