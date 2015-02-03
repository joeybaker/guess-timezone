# guess-timezone [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

Make a best guess of the user's timezone. Uses the Intl API if avaliable. Works on the client and the server.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
  - [calc](#calc)
  - [setWhitelist `([Array whitelist])`](#setwhitelist-array-whitelist)
  - [unsetWhitelist](#unsetwhitelist)
- [Tests](#tests)
- [Developing](#developing)
  - [Requirements](#requirements)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -S guess-timezone
```


## Usage

```js
var guessTimezone = require('guess-timezone')

guessTimezone.setWhitelist() // now will only return US timezones
guessTimezone.setWhitelist(['Europe/London', 'America/New_York']) // will now only return one of these two timezones
guessTimezone.unsetWhitelist() // any timezone is now valid

guessTimezone.calc()
// 'America/Los_Angeles'
```

## Methods
### calc
Returns the best guess of the current timezone. If the `Intl` API [caniuse data](http://caniuse.com/#feat=internationalization) is available, it is used, and the timezone is very accurate. Else, the timezone is guessed from the timezone offset.

### setWhitelist `([Array whitelist])`
If the `Intl` API isn't used, limits the timezones that the `calc` method will return. This is desirable because if the timezone needs to be guessed, many offsets can match the user's offset.

If called without an argument, limits to the most common US timezones. If called with an array, limits to those timezones. Timezones must be strings in Olson TZID format.

### unsetWhitelist
Removes the previously set whitelist.

## Tests
Tests are [prova](https://github.com/azer/prova), based on [tape](https://github.com/substack/tape). They can be run with `npm test`.

Tests can be run in a loop with `npm run tdd`

## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

## License

Artistic 2.0 © [Joey Baker](https://byjoeybaker.com)


[npm-url]: https://npmjs.org/package/guess-timezone
[npm-image]: https://badge.fury.io/js/guess-timezone.svg
[travis-url]: https://travis-ci.org/joeybaker/guess-timezone
[travis-image]: https://travis-ci.org/joeybaker/guess-timezone.svg?branch=master
[daviddm-url]: https://david-dm.org/joeybaker/guess-timezone.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/joeybaker/guess-timezone
