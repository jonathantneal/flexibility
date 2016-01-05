# Flexibility

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Flexibility] is a polyfill for [Flexible Box Layout Module Level 1]. Use it to design beautiful, flexible layouts on the web without sacrificing the experience in older Internet Explorer browsers.

Flexbox provides an efficient way to lay out, align, and distribute items in a container, even when their size is unknown or dynamic. To better understand Flexbox, take a moment to read [Chris Coyier]’s excellent [Complete Guide to Flexbox].

To start using Flexbox in Internet Explorer 8 & 9, add a `-js-display` display property to your CSS file.

```css
.container {
	-js-display: flex;
	display: flex;

	align-contents: stretch;
}
```

While [Flexibility] is still in active development, it can already do so much. Therefore, it has been released even in an incomplete state. Your contributions, feedback, and encouragement are greatly appreciated.

### How to use it

Download the [dist/flexibility.js](dist/flexibility.js) script and include it somewhere on your page. [Flexibility] will automatically detect any flex-affected elements on the page and restyle them accordingly in Internet Explorer 8 & 9.

If you use [PostCSS] take a look at [postcss-flexibility].

### How it works

The secret to flexibility is leveraging proprietary features in older Internet Explorers.

Internet Explorer 8 & 9 have a proprietary feature called [`currentStyle`] which returns the raw CSS applied to an element. While known properties (like `display`) are sanitized to return only valid values, “unknown” properties like `align-contents`, `justify-content`, and `flex` return exactly what they received. As a result, flex properties can be easily read from any element without fetching or parsing any stylesheets. In short, your cross domain CSS is safe.

Once all of the flex values are processed, basic flex display is applied to the document. Finally, careful measurements are taken of all flexbox elements, and new style declarations are written to simulate whatever flexbox would have done natively.

Overwriting style declarations can be tricky, especially when inline styles are considered, which is why another IE proprietary feature called [`runtimeStyle`] is used to assign new declarations without compromising inline styles. In short, no messy style attributes.

[ci]:      https://travis-ci.org/10up/flexibility
[ci-img]:  https://img.shields.io/travis/10up/flexibility.svg
[npm]:     https://www.npmjs.com/package/flexibility
[npm-img]: https://img.shields.io/npm/v/flexibility.svg

[Flexibility]: https://github.com/10up/flexibility

[Chris Coyier]: https://twitter.com/chriscoyier
[Complete Guide to Flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[`currentStyle`]: http://help.dottoro.com/ljqkvomc.php
[flexibility.js]: https://github.com/10up/flexibility/blob/master/flexibility.js
[Flexible Box Layout Module Level 1]: http://www.w3.org/TR/css3-flexbox/
[GNU General Public License]: https://github.com/10up/flexibility/blob/master/LICENSE.md
[`runtimeStyle`]: http://help.dottoro.com/ljhddfwr.php
[PostCSS]: https://github.com/postcss/postcss
[postcss-flexibility]: https://github.com/7rulnik/postcss-flexibility
