# Flexibility

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Flexibility] is a polyfill for [Flexible Box Layout Module Level 1]. Use it to design beautiful, flexible layouts on the web without sacrificing the experience in older Internet Explorer browsers.

Flexbox provides an efficient way to lay out, align, and distribute items in a container, even when their size is unknown or dynamic. To better understand Flexbox, take a moment to read [Chris Coyier]’s excellent [Complete Guide to Flexbox].

```css
.container {
	-js-display: flex;
	display: flex;

	align-contents: stretch;
}
```

To get picked up in Internet Explorer 8 & 9, a special (`-js-display`) display property is used.

While [Flexibility] is still in active development, it can already do so much. Therefore, it has been released even in an incomplete state. Your contributions, feedback, and encouragement are greatly appreciated.

### How to use it

Download the [flexibility.js] script and include it somewhere on your page. [Flexibility] will automatically detect any flex-affected elements on the page and restyle them accordingly in Internet Explorer 8 & 9.

### How it works

The secret sauce is proprietary features.

Internet Explorer 8 & 9 have a proprietary feature called `currentStyle` which returns every raw CSS property applied to an element. While known properties like `display` return only valid values, “unknown” properties like `align-contents`, `justify-content`, and `flex` are returned without alteration. The result is this; without parsing any stylesheets, flex properties are easily read from any element.

Once all of the flex values are known, measurements of flex-affected elements are taken and new style declarations are written to simulate what flex does natively. While overwriting style declarations is tricky when inline styles are considered, another IE proprietary feature called `runtimeStyle` is used to assign new declarations without compromising existing inline styles.

[ci]:      https://magnum.travis-ci.com/10up/flexibility
[ci-img]:  https://api.travis-ci.com/10up/flexibility.svg?token=mqvp34VgHUamyk5XDa9d
[npm]:     https://www.npmjs.com/package/flexibility
[npm-img]: https://img.shields.io/npm/v/flexibility.svg

[Flexibility]: https://github.com/10up/flexibility

[Chris Coyier]: https://twitter.com/chriscoyier
[Complete Guide to Flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[flexibility.js]: /flexibility.js
[Flexible Box Layout Module Level 1]: http://www.w3.org/TR/css3-flexbox/
