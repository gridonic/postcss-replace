# PostCSS Replace [![Build Status](https://travis-ci.org/gridonic/postcss-replace.svg)](https://travis-ci.org/gridonic/postcss-replace)

[PostCSS](https://github.com/postcss/postcss) plugin for replacing strings.

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

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.

## Options

### `pattern`

- Type: `string` | `RegEx`
- Default: `'{{\\s?([^\\s]+?)\\s?}}'`

The default pattern will replace strings in the format of `{{ myExampleKey }}`. Adjust this pattern if you want 
something different, for example `/_([^\s]+?)_/` to match strings like `_myExampleKey_`.

### `commentsOnly`

- Type: `boolean`
- Default: `false`

By default the plugin will replace strings in comments _and_ values. Turn the to true if you _only_ want to replace strings 
in comments.

### `data`

- Type: `object`
- Default: `{}`

This is the key → value object that provides the data for the plugin for replacing strings.