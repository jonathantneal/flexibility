# Flexibility

[![Join the chat at https://gitter.im/10up/flexibility](https://badges.gitter.im/10up/flexibility.svg)](https://gitter.im/10up/flexibility?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[Flexibility] is a polyfill for the [Flexible Box Layout], commonly known as Flexbox. With Flexibility, you get to design beautiful, flexible layouts on the web without sacrificing the experience in older Internet Explorer browsers.

[![Screenshot of Flexibility][screenshot]][demo]

Flexbox is used lay out, align, and distribute elements in a container, even when their size is unknown or dynamic. To better understand Flexbox, read [Chris Coyier]’s excellent [Complete Guide to Flexbox].

To start using Flexbox in Internet Explorer 8 & 9, download the [flexibility.js] script and include it anywhere on your page.

```html
<script src="flexibility.js"></script>
```

Next, add a `-js-display: flex` declaration before any `display: flex` declarations in your CSS, or use [PostCSS Flexibility] to automate this during your build process.

```css
.container {
	-js-display: flex;
	display: flex;
}
```

[Flexibility] will automatically detect any flex-affected elements on the page and restyle them accordingly in Internet Explorer 8 & 9.

---

To learn more about [Flexibility], read the [support] section.

If you experience an issue, read the [contributing] section before creating an issue.

[ci]:      https://travis-ci.org/10up/flexibility
[ci-img]:  https://img.shields.io/travis/10up/flexibility.svg
[npm]:     https://www.npmjs.com/package/flexibility
[npm-img]: https://img.shields.io/npm/v/flexibility.svg

[Flexibility]: https://github.com/10up/flexibility
[contributing]: CONTRIBUTING.md
[demo]: https://10up.github.io/flexibility/
[flexibility.js]: dist/flexibility.js
[screenshot]: https://10up.github.io/flexibility/screenshot.png
[support]: SUPPORT.md

[Chris Coyier]: https://twitter.com/chriscoyier
[Complete Guide to Flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[Flexible Box Layout]: http://www.w3.org/TR/css3-flexbox/
[GNU General Public License]: https://github.com/10up/flexibility/blob/master/LICENSE.md
[PostCSS Flexibility]: https://github.com/7rulnik/postcss-flexibility
