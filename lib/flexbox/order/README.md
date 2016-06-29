# order

The `order` methods sorts the flex items based on their flex order.

```js
order( target )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/#propdef-justify-content

1. Sort each `child` in `target.children`;
	1. Return `child-a.order` sans `child-b.order`, or, if it is `0`;
	   return `child-a.index` sans `child-b.index`.
