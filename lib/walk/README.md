# walk

The `walk` method...

```js
walk( target, existingStyle );
```

### Specification

If `target` has a `data-flex` attribute that contains a flex style;
	Let `is-flex-container` flag be `true`.
Otherwise;
	Let `is-flex-container` flag be `false`.
If `is-flex-container` is `true`;
	If `existing-style` is `undefined`;
		Let `style` be the value of `read( target )`.
	Let `style.items` be a new `Array`.
For each `child-node` in `target`;
	If `is-flex-container` is `true`, and `child-node` is a non-empty `Text`;
		Replace `child-node` with an `Element` that contains the non-empty `Text`.
	If `child-node` is an `Element`;
		If `is-flex-container` is `true`, or `child-node` has a `data-flex` attribute;
			Let `child-style` be the value of `read( target )`.
			Push `child-style` to `style.items`.
		Process `walk( child-node, child-style )`.
