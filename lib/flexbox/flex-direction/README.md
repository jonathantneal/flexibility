# flex-direction

The `flex-direction` methods calculates the axis and lengths of a flex container or item.

```js
flexDirection( child, target.flexDirection, target.alignItems )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-flex-direction

1. If `display` is `"flex"`;
	1. For each `child` in `target.children`;
		1. Let `child.node.style.display` be `"inline-block"`;
		-  Perform `flex-direction( child, target.flex-direction, target.align-items )`.
1. If `flex-direction` is `"row"` or `"row-reverse"`;
	1. Let `target.main-axis` be `"inline"`.
	-  Let `target.cross-axis` be `"block"`.
	-  Let `target.main` be `target.width`.
	-  Let `target.cross` be `target.height`.
	-  Let `target.main-client` be `target.rectangle-width`.
	-  Let `target.cross-client` be `target.rectangle-height`.
	-  Let `target.main-before` be `target.margin-left`.
	-  Let `target.main-after` be `target.margin-right`.
	-  Let `target.cross-before` be `target.margin-top`.
	-  Let `target.cross-after` be `target.margin-bottom`.
-  Otherwise, if `target.flex-direction` is `column` or `column-reverse`;
	1. Let `target.main-axis` be `"block"`.
	-  Let `target.cross-axis` be `"inline"`.
	-  Let `target.main` be `target.height`.
	-  Let `target.cross` be `target.width`.
	-  Let `target.main-client` be `target.rectangle-height`.
	-  Let `target.cross-client` be `target.rectangle-width`.
	-  Let `target.main-before` be `target.margin-top`.
	-  Let `target.main-after` be `target.margin-bottom`.
	-  Let `target.cross-before` be `target.margin-left`.
	-  Let `target.cross-after` be `target.margin-right`.
-  If `target.flex-basis` is a `Number`;
	1. Let `target.main` is `target.flex-basis`.
-  If `target.main` is `"auto"`;
	1. Let `target.main-around` be `target.main-client`.
-  Otherwise;
	1. Let `target.main-around` be `target.main`.
-  If `target.cross` is `"auto"`;
	1. Let `target.cross-around` be `target.cross-client`.
-  Otherwise;
	1. Let `target.cross-around` be `target.cross`.
-  If `target.main-before` is a `Number`;
	1. Let `target.main-around` be itself and `target.main-before`.
-  If `target.main-after` is a `Number`;
	1. Let `target.main-around` be itself and `target.main-after`.
-  If `target.cross-before` is a `Number`;
	1. Let `target.cross-around` be itself and `target.cross-before`.
-  If `target.cross-after` is a `Number`;
	1. Let `target.cross-around` be itself and `target.cross-after`.
-  If `target.align-self` is `"auto"`;
	1. Let `target.align-self` be `align-items`.

[Implementation](index.js) [Tests](test.js)
