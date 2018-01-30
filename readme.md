# PostCSS Better Colors<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor-img]: https://img.shields.io/badge/Sponsored%20by-Sebastian%20Software-692446.svg
[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/postcss-better-colors
[deps-img]: https://david-dm.org/sebastian-software/postcss-better-colors.svg
[npm]: https://www.npmjs.com/package/postcss-better-colors
[npm-downloads-img]: https://img.shields.io/npm/dm/postcss-better-colors.svg
[npm-version-img]: https://img.shields.io/npm/v/postcss-better-colors.svg
[travis-img]: https://img.shields.io/travis/sebastian-software/postcss-better-colors/master.svg?branch=master&label=unix%20build
[appveyor-img]: https://img.shields.io/appveyor/ci/swernerx/postcss-better-colors/master.svg?label=windows%20build
[travis]: https://travis-ci.org/sebastian-software/postcss-better-colors
[appveyor]: https://ci.appveyor.com/project/swernerx/postcss-better-colors/branch/master


[PostCSS](https://github.com/postcss/postcss) plugin to transform [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color) to a custom palette

This plugin can transform color keywords such as `aqua`, `blue`, `lime`, etc.
to any other color. Bundled with the
[webcolors](https://github.com/zaim/webcolors) package, making three beautiful
color palettes available to use in your stylesheets: [clrs.cc](http://clrs.cc)/[mrmrs](https://github.com/mrmrs/colors),
[FlatUI](http://flatuicolors.co) and [Material](http://www.google.com/design/spec/style/color.html) -- simply by using standard color names.

## Installation

```
$ npm install postcss-better-colors
```

## Usage

```javascript
// dependencies
var fs = require('fs');
var postcss = require('postcss');
var palette = require('postcss-better-colors');

// css to be processed
var css = fs.readFileSync('input.css', 'utf8');

// process it
var output = postcss()
  .use(palette({
    palette: 'material'
  })
  .process(css)
  .css;
```

Using this `input.css`:

```css
body {
  color: yellow;
  background: linear-gradient(aqua, blue 50%, purple);
}
```

you will get:

```css
body {
  color: #FFEB3B;
  background: linear-gradient(#00BCD4, #2196F3 50%, #9C27B0);
}
```

### Options

#### `palette`

Specify a [webcolors](https://github.com/zaim/webcolors) palette name
(`mrmrs`, `material` or `flatui`), or an object mapping of [CSS2 color keywords](http://www.w3.org/TR/2011/REC-CSS2-20110607/syndata.html#value-def-color) to
color values. By default, uses the [mrmrs](https://github.com/mrmrs/colors)
color palette.


## License

[Apache License Version 2.0, January 2004](license)

## Copyright


<img src="https://github.com/sebastian-software/sebastian-software-brand/blob/master/sebastiansoftware-en.svg" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2015<br/>Zaim Bakar<br/><br/>
Copyright 2017-2018<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
