# Contributing

<a href="https://github.com/jonathantneal/flexibility"><img src="https://jonathantneal.github.io/flexibility/logo.svg" alt="Flexibility Logo" width="60" height="60" align="right"></a>

[![npm][npm-image]][npm-url] [![bower][bower-image]][bower-url]
[![ci][ci-image]][ci-url] [![gitter][gitter-image]][gitter-url]

You want to help? You rock! Now, take a moment to be sure your contributions
make sense to everyone else.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported].
- Provide a [reduced test case] or a [live example].

These are as easy to do as they are to forget. So, to keep things moving along,
issues that do not meet these standards will be removed after 1 day.

And remember, a bug is a _demonstrable problem_ caused by _our_ code.

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in
scope, and do avoid unrelated commits.

1. To begin, [fork this project], clone your fork, and add our upstream.
	```bash
	# Clone your fork of the repo into the current directory
	git clone https://github.com/<your-username>/flexibility
	# Navigate to the newly cloned directory
	cd flexibility
	# Assign the original repo to a remote called "upstream"
	git remote add upstream https://github.com/jonathantneal/flexibility
	# Install the tools necessary for development
	npm install
	```

2. Create a branch for your feature or fix:
	```bash
	# Move into a new branch for a feature
	git checkout -b feature/thing
	```
	```bash
	# Move into a new branch for a fix
	git checkout -b fix/something
	```

3. Be sure your code follows our practices.
	```bash
	# Test current code
	npm run test
	```

4. Push your branch up to your fork:
	```bash
	# Push a feature branch
	git push origin feature/thing
	```
	```bash
	# Push a fix branch
	git push origin fix/something
	```

5. Now [open a pull request] with a clear title and description.

---

To learn more about [Flexibility], read the [support] section.

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
[support]: SUPPORT.md

[already been reported]: https://github.com/jonathantneal/flexibility/issues
[fork this project]:     https://github.com/jonathantneal/flexibility/fork
[live example]:          http://codepen.io/pen
[open a pull request]:   https://help.github.com/articles/using-pull-requests/
[reduced test case]:     https://css-tricks.com/reduced-test-cases/
