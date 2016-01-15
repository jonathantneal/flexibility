# Support

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

If you experience an issue, read the [contributing] section before creating an issue.

## Supported Features

Name | Value
----:|------
display | flex \| inline-flex
flex-direction | column \| row
justify-content | flex-start \| center \| flex-end \| space-between \| space-around
align-items, align-self | flex-start \| center \| flex-end \| stretch
flex-wrap | wrap \| nowrap
order | [CSS Integer]
width, min-width, max-width | [CSS Length]
height, min-height, max-height | [CSS Length]
margin, margin-left, margin-right, margin-top, margin-bottom | [CSS Length]
padding, padding-left, padding-right, padding-top, padding-bottom | [CSS Length]
border-width, border-left-width, border-right-width, border-top-width, border-bottom-width | [CSS Length]

## Known Issues

- When live switching `align-items: stretch` from `flex-direction: row` to `flex-direction: column`, sometimes the items do not stretch to the container.
- In IE8, flex items whose widths are determined by inline text don’t always resize on resize.
- IE 11 pretending to be IE 8 or 9 returns a Flexbox support false positive.

### How Flexibility Works

The secret to flexibility is leveraging proprietary features in older Internet Explorers.

Internet Explorer has a proprietary feature called [`currentStyle`] which returns the raw CSS applied to an element. While known properties (like `display`) are sanitized to return only valid values, “unknown” properties like `align-contents`, `justify-content`, and `flex` return exactly what they received. As a result, “unknown” flex properties can be easily read from any element without fetching or parsing stylesheets. In short, your cross domain CSS is safe.

Once all of the flex values are processed, basic flex display is applied to the document. Then, [CSS Layout] calculates the positions for elements to simulate Flexbox.

Overwriting style declarations can be tricky, especially when inline styles are considered, which is why another IE proprietary feature called [`runtimeStyle`] is used to assign new declarations without compromising inline styles. In short, no messy style attributes.

## API

Flexibility creates a global `flexibility` object with methods you may hook into to customize your Flexbox experience.

#### `detect`

Returns: `Boolean`

Return whether the browser supports prefix-less Flexbox.

#### `init`

Argument: `Element`  
Returns: `Details Object`

Initialize an element for Flexibility usage and return a Details Object.

#### `onresize`

Argument: `Event { target: Element }`  
Default: `document.documentElement`

Temporarily suspend automatic resize detection and [walk][#walk] the target but only if the viewport width has changed.

#### `updateFlexContainerCache`

Argument: `Details Object`  
Default: `null`

Refresh any Flex Container CSS applied to the element of a Details Object.

#### `updateFlexItemCache`

Argument: `Details Object`  
Default: `null`

Refresh any Flex Item CSS applied to the element of a Details Object.

#### `updateLengthCache`

Argument: `Details Object`  
Default: `null`

Refresh width, height, etc. measurements applied to the element of a Details Object.

#### `walk`

Argument: `Element`  
Default: `null`

Walk the element and apply Flexbox layout to any matching elements.

---

If you experience an issue, read the [contributing] section before creating an issue.

[ci]:      https://travis-ci.org/10up/flexibility
[ci-img]:  https://img.shields.io/travis/10up/flexibility.svg
[npm]:     https://www.npmjs.com/package/flexibility
[npm-img]: https://img.shields.io/npm/v/flexibility.svg

[Flexibility]: https://github.com/10up/flexibility

[contributing]: CONTRIBUTING.md

[CSS Integer]: https://developer.mozilla.org/en-US/docs/Web/CSS/integer#Interpolation
[CSS Layout]: https://github.com/10up/flexibility/tree/css-layout
[CSS Length]: https://developer.mozilla.org/en-US/docs/Web/CSS/length

[`currentStyle`]: http://help.dottoro.com/ljqkvomc.php
[`runtimeStyle`]: http://help.dottoro.com/ljhddfwr.php
