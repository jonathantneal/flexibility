# flexibility.readAll

The **readAll()** method returns an unordered list of flexbox related details as discovered on an element or any of its descendants.

### Syntax

```js
var detailsList = flexibility.readAll( element );
```

### Default Response

```js
[
	{
		"element": element,
		"style": {
			"alignContent": "stretch"
			"alignItems": "stretch"
			"alignSelf": "auto"
			"display": "inline"
			"flexBasis": "auto"
			"flexDirection": "row"
			"flexGrow": 0
			"flexShrink": 1
			"flexWrap": "nowrap"
			"justifyContent": "flex-start",
			"height": "auto"
			"marginTop": 0
			"marginRight": 0
			"marginLeft": 0
			"marginBottom": 0
			"maxHeight": "none"
			"maxWidth": "none"
			"minHeight": 0
			"minWidth": 0
			"order": 0
			"position": "static"
			"width": "auto"
		},
		"children": [
			...
		]
	},
	...
]
```

[Implementation](index.js)
