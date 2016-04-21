# flex-grow

The `flex-grow` methods calculates any numerical increase to lengths of flex items along the main axis.

```js
flexGrow( line )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-flex-grow

1. If `line.main-space` is greater than `0`.
	1. Let `grow-factor` be all the `child.flex-grow` in `line.children`.
	-  If `grow-factor` is greater than `0`.
		1. For each `child` in `line.children`;
			1. Let `child.main-around` be itself and;
				`child.flex-grow` divided by `grow-factor` multiplied by `line.main-space`.
		-  Let `line.main` be all the `child.main-around` in `line.children`.
		-  Let `line.main-space` be `0`.

[Implementation](index.js) [Tests](test.js)
