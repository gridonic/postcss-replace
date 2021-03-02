# PostCSS Replace [<img src="http://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS] 

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Coverage Status][cov-img]][cov-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

[PostCSS] plugin for replacing strings.

**Write this:**

```css
/* CustomCSS Library v{{ version }} */
.foo {
  content: "{{ author }}";
}
```

**And get this:**

```css
/* CustomCSS Library v1.3.7 */
.foo {
  content: "Gridonic";
}
```

## Installation

`$ npm install postcss-replace`

## Usage

```JS
postcss([ require('postcss-replace') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for [examples regarding usage](https://github.com/postcss/postcss#usage).

## Options

### `pattern`

- Type: `string` | `RegEx`
- Default: `'{{\\s?([^\\s]+?)\\s?}}'`

The default pattern will replace strings in the format of `{{ myExampleKey }}`. Adjust this pattern if you want 
something different, for example `/_([^\s]+?)_/` to match strings like `_myExampleKey_`.

### `commentsOnly`

- Type: `boolean`
- Default: `false`

By default the plugin will replace strings in comments _and_ values. Turn this to `true` if you _only_ want to replace strings 
in comments.

### `data`

- Type: `object`
- Default: `{}`

This is the key → value object that provides the data for the plugin for replacing strings.

- If the key `replaceAll` is provided all matched strings will be replaced by the given value
e.g:
`data: { replaceAll: 'replace all matched strings with this text' }` 

## Testing

Tests can be run via the following command:

`$ npm run test`

We use mutant-testing to test the resilience of our tests. 
Stryker can be run via the following command:

`$ npm run test:mutate`

[npm-url]: https://www.npmjs.com/package/postcss-replace
[npm-img]: https://img.shields.io/npm/v/postcss-replace.svg
[cli-url]: https://travis-ci.org/gridonic/postcss-replace
[cli-img]: https://travis-ci.org/gridonic/postcss-replace.svg
[lic-url]: LICENSE
[lic-img]: https://img.shields.io/npm/l/postcss-replace.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
[cov-url]: https://coveralls.io/github/gridonic/postcss-replace?branch=master
[cov-img]: https://coveralls.io/repos/github/gridonic/postcss-replace/badge.svg?branch=master

[PostCSS]: https://github.com/postcss/postcss
