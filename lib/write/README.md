# write

The `write` method takes a `flexbox()` object and writes it as compatible CSS to its node.

```js
write(target);
```

1. If something;
	1. Let `style.position` be `"relative"`.
	+  If `target.main-axis` is `"inline"`;
		1. Let `style.width` be `target.main`.
	+  Otherwise, if `target.main` is `"block"`;
		1. Let `style.width` be `target.cross`.
	+  If `target.cross-axis` is `"block"`;
		1. Let `style.width` be `target.cross`.
	+  Otherwise, if `target.main` is `"block"`;
		1. Let `style.height` be `target.main`.
-  Otherwise, if something else;
	1. Let `style.position` be `"absolute"`.
	-  Let `style.width` be `main` sans `main-before` sans `main-after`.
	-  Let `style.height` be `cross` sans `cross-before` sans `cross-after`.
	-  Let `style.margin-top` be `cross-before`.
	-  Let `style.margin-right` be `main-after`.
	-  Let `style.margin-bottom` be `cross-after`.
	-  Let `style.margin-left` be `main-before`.

-  For each `child` of `target.children`;
	1. Perform `style( child )`.
