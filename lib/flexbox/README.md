# flexbox

The `flexbox` method calculates the lengths and positions used to simulate CSS Flexible Box Layout on a flex container.

```js
flexbox( target )
```

### Specification

> https://drafts.csswg.org/css-flexbox-1/

1. Perform `flexbox-lines( target )`.
-  If `target.main` is `"auto"`;
	1. Let `target.main` be the `Math.max` of all the `line.main` in `target.lines`.
-  If `target.cross` is `"auto"`;
	1. Let `target.cross` be all the `line.cross` in `target.lines`.
	-  Let `target.cross-space` be `target.cross-around` sans `target.cross`.
- Otherwise;
	1. Let `target.cross-space` be `target.cross` sans all the `line.cross` in `target.lines`.
-  For each `line` in `target.lines`;
	1. Let `line.main-space` be `target.main` sans `line.main`.
	-  Perform `flex-shrink( line )`.
	-  Perform `margin-main( line )`.
	-  Perform `margin-cross( line )`.
	-  Perform `justify-content( line, target.justify-content )`.
-  Perform `align-content( target )`.
-  Perform `align-items( target )`.

### Dependencies

#### order

The `order` methods sorts the flex items based on their flex order.

#### [flexbox-lines](flexbox-lines)

The `lines` method calculates the lengths of lines in a flex container.

#### [flex-direction](flex-direction)

The `flex-direction` methods calculates the axis and lengths of a flex container or item.

#### [flex-grow](flex-grow)

The `flex-grow` methods calculates any numerical increase to lengths of flex items along the main axis.

#### [flex-shrink](flex-shrink)

The `flex-shrink` methods calculates any numerical decrease to lengths of flex items along the main axis.

#### [margin-main](margin-main)

The `margin-main` method calculates the numerical value of flex item margins set to `"auto"` along the main axis.

#### [margin-cross](margin-cross)

The `margin-cross` method calculates the numerical length of flex item margins set to `"auto"` along the cross axis.

#### [justify-content](justify-content)

The `justify-content` method calculates the position of flex items in a line along the main axis.

#### [align-items](align-items)

The `align-self` method calculates the position of flex items along the cross axis.

#### [align-content](align-content)

The `align-content` method calculates the position of flex lines along the cross axis.

[Implementation](index.js) [Tests](test.js)
