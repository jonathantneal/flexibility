# Contributing

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

You want to help? You rock! Now, take a moment to be sure your contributions make sense to everyone else.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported].
- Provide a [reduced test case] or a [live example].

Remember, a bug is a _demonstrable problem_ caused by _our_ code.

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

1. To begin, [fork this project], clone your fork, and add our upstream.
	```bash
	# Clone your fork of the repo into the current directory
	git clone https://github.com/<your-username>/flexibility
	# Navigate to the newly cloned directory
	cd flexibility
	# Assign the original repo to a remote called "upstream"
	git remote add upstream https://github.com/10up/flexibility
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

If you experience an issue, read the [contributing] section before creating an issue.

[ci]:      https://travis-ci.org/10up/flexibility
[ci-img]:  https://img.shields.io/travis/10up/flexibility.svg
[npm]:     https://www.npmjs.com/package/flexibility
[npm-img]: https://img.shields.io/npm/v/flexibility.svg

[Flexibility]: https://github.com/10up/flexibility

[contributing]: CONTRIBUTING.md
[support]: SUPPORT.md

[already been reported]: https://github.com/10up/flexibility/issues
[fork this project]:     https://github.com/10up/flexibility/fork
[live example]:          http://codepen.io/pen
[open a pull request]:   https://help.github.com/articles/using-pull-requests/
[reduced test case]:     https://css-tricks.com/reduced-test-cases/
