# Support

<a href="https://github.com/jonathantneal/flexibility"><img src="https://jonathantneal.github.io/flexibility/logo.svg" alt="Flexibility Logo" width="60" height="60" align="right"></a>

[![npm][npm-image]][npm-url] [![bower][bower-image]][bower-url]
[![ci][ci-image]][ci-url] [![gitter][gitter-image]][gitter-url]

## Supported Features

Name | Value
----:|------
`display` | flex \| inline-flex
`flex-direction` | column \| row
`justify-content` | flex-start \| center \| flex-end \| space-between \| space-around
`align-items`, align-self | flex-start \| center \| flex-end \| stretch
`flex` | [flex-grow]
`flex-flow` | `flex-direction` + `flex-wrap`
`flex-grow` | [CSS Number]
`flex-wrap` | wrap \| nowrap
`order` | [CSS Integer]
`width`, `min-width`, `max-width` | [CSS Length]
`height`, `min-height`, `max-height` | [CSS Length]
`margin`, `margin-left`, `margin-right`, `margin-top`, `margin-bottom` | [CSS Length]
`padding`, `padding-left`, `padding-right`, `padding-top`, `padding-bottom` | [CSS Length]
`border-width`, `border-left-width`, `border-right-width`, `border-top-width`, `border-bottom-width` | [CSS Length]

## Known Issues

- The `flex` shorthand only supports `flex-grow` at this time.
- Changing an `align-items: stretch` container from `flex-direction: row` to
  `flex-direction: column` on the fly will sometimes fail to stretch the newly
  columned items.
- IE8 believes everything is `margin: auto` unless you first set `* { margin: 0; }`. Afterward, `margin: auto` will work as expected.
- In IE8, flex items whose widths are determined by inline text don’t alway
  resize on resize.

### How Flexibility Works

Flexibility uses `data-style` attributes, inline and computed styles, and the
proprietary Internet Explorer `currentStyle` property to determine the current
flex styles of an element.

Internet Explorer’s proprietary [`currentStyle`] property returns the raw CSS
applied to an element. While known properties (like `display`) are sanitized to
return only valid values, “unknown” properties like `align-contents`,
`justify-content`, and `flex` return exactly what they received. As a result,
“unknown” flex properties can be easily read from any element without fetching
or parsing stylesheets. In short, your cross domain CSS is safe.

Once all of the flex values are processed, basic flex display is applied to the
document. Then, [CSS Layout] calculates the positions for elements to simulate
Flexbox.

### Detecting Flexbox Support

Flexibility does not include a detection script. You may already have one if
you use Modernizr.

```js
if (Modernizr.flexbox && Modernizr.flexwrap) {
	// Modern Flexbox with `flex-wrap` is supported
} else {
	flexibility(document.documentElement);
}
```

You could also include your basic test.

```js
function supportsFlexBox() {
	var test = document.createElement('test');

	test.style.display = 'flex';

	return test.style.display === 'flex';
}

if (supportsFlexBox()) {
	// Modern Flexbox is supported
} else {
	flexibility(document.documentElement);
}
```

### Responding to Window Resize

If recalculating Flexbox on resizes, be mindful of infinite loops caused by
Flexbox itself triggering a resize. A small debounce will resolve this.

```js
var onresizeTimeout;

window.onresize = onresize;

function onresize() {
	window.onresize = null;

	if (!onresizeTimeout) {
		onresizeTimeout = setTimeout(function () {
			onresizeTimeout = null;

			flexibility(container);

			window.onresize = onresize;
		}, 1000 / 60);
	}
}
```

---

If you experience an issue, read the [contributing] section before creating an
issue.

[bower-image]:  https://img.shields.io/bower/v/flexibility.svg?style=flat-square
[bower-url]:    https://libraries.io/bower/flexibility
[ci-image]:     https://img.shields.io/travis/jonathantneal/flexibility.svg?style=flat-square
[ci-url]:       https://travis-ci.org/jonathantneal/flexibility
[gitter-image]: https://img.shields.io/gitter/room/jonathantneal/flexibility.svg?style=flat-square
[gitter-url]:   https://gitter.im/jonathantneal/flexibility
[npm-image]:    https://img.shields.io/npm/v/flexibility.svg?style=flat-square
[npm-url]:      https://www.npmjs.com/package/flexibility

[Flexibility]: https://github.com/jonathantneal/flexibility

[contributing]: CONTRIBUTING.md

[CSS Integer]: https://developer.mozilla.org/en-US/docs/Web/CSS/integer#Interpolation
[CSS Layout]: https://github.com/jonathantneal/flexibility/tree/css-layout
[CSS Length]: https://developer.mozilla.org/en-US/docs/Web/CSS/length

[`currentStyle`]: http://help.dottoro.com/ljqkvomc.php
[`runtimeStyle`]: http://help.dottoro.com/ljhddfwr.php
