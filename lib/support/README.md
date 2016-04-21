# support

The `support` method determines whether the browser supports the late 2012 syntax of Flexible Box Layout.

Browsers not supporting this syntax, including browsers supporting the older syntaxes (2009’s `display: box` and 2011 to early 2012’s `display: flexbox`) will fail the test.

```js
support( element );
```

### Specification

1. Let `element.style.display` be `"flex"`.
-  Return whether `element.style.display` is still `"flex"`.
