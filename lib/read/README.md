# flexibility.read

The **read()** method returns the Flexbox related details of an element.

### Syntax

```js
var detailsObject = flexibility.read( element );
```

### Example Response

```js
{
	"element": Element,
	"style": {
		"alignContent": "stretch"
		"alignItems": "stretch"
		"alignSelf": "auto"
		"display": "inline"
		"flexBasis": "auto"
		"flexDirection": "row"
		"flexGrow": "0"
		"flexShrink": "1"
		"flexWrap": "nowrap"
		"justifyContent": "flex-start",
		"height": "auto"
		"marginTop": "0"
		"marginRight": "0"
		"marginLeft": "0"
		"marginBottom": "0"
		"maxHeight": "none"
		"maxWidth": "none"
		"minHeight": "0"
		"minWidth": "0"
		"order": "0"
		"position": "static"
		"width": "auto"
	}
}
```

[Implementation](index.js)
