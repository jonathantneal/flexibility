# `flex-shrink( line )`

The `flex-shrink` methods calculates any numerical decrease to lengths of flex items along the main axis.

```js
flexGrow( line )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-flex-shrink

1. If `line.main-space` is less than `0`.
	1. Let `shrink-factor` be all the `child.flex-shrink` in `line.children`.
	-  If `shrink-factor` is greater than `0`.
		1. For each `child` in `line.children`;
			1. Let `child.main-around` be itself and;
			   `child.flex-shrink` divided by `shrink-factor` multiplied by `line.main-space`.
		-  Let `line.main` be all the `child.main-around` in `line.children`.
		-  Let `line.main-space` be `0`.

[Implementation](index.js) [Tests](test.js)
