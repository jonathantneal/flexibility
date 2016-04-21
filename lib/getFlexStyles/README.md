# read

The `read` method returns the Flexbox styles of a `Node`.

```js
read( target )
```

### Specification

1. Let `style` be an `Object` of [default Flexbox styles](#Default+Flexbox+Styles).
-  If `data-style` attribute exists on `target`;
	1. Let `style` attribute value be `data-style` attribute value.
-  Otherwise;
	1. Let `data-style` attribute value be `style` attribute value.
-  Override `style` with styles parsed from `data-style` and `data-flex` attribute.
-  Let `style.client-width` be bounding client width of `target`.
-  Let `style.client-height` be bounding client height of `target`.
-  Return `style`.

### Default Flexbox styles

```json
{
	"alignContent": "stretch",
	"alignItems": "stretch",
	"alignSelf": "auto",
	"display": "inline",
	"flexBasis": "auto",
	"flexDirection": "row",
	"flexGrow": 0,
	"flexShrink": 1,
	"flexWrap": "nowrap",
	"justifyContent": "flex-start",
	"height": "auto",
	"marginTop": 0,
	"marginRight": 0,
	"marginLeft": 0,
	"marginBottom": 0,
	"maxHeight": "none",
	"maxWidth": "none",
	"minHeight": 0,
	"minWidth": 0,
	"order": 0,
	"position": "static",
	"width": "auto"
}
```
