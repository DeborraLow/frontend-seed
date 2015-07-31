# Logitech Template Redesign

> Logitech is launching many new products this year and refreshing its brand. To support this, Huge is helping them re-skin their existing site. Huge is delivering designed templates which will be integrated into the existing Logitech infrastructure by the client tech team. 

## Prerequisites

### Install Node

#### Binary option

- [Node](http://nodejs.org/download/)

#### Homebrew option

```bash
brew install node
```
### Install bower and gulp

```bash
npm install -g bower
npm install -g gulp
*These may require root*
```

### Install all required node modules
```bash
npm install
```

### Install all required bower components
```bash
bower install
```

## Getting Started

```bash
  gulp
```

## Overview


### Automation

Technology | Overview
--- | ---
[Gulp](http://gulpjs.com/) | The streaming build system
[Bower](http://bower.io/) | Package manager for the web

### Scripting

Technology | Overview
--- | ---
[jQuery](http://jquery.com) | JavaScript DOM manipulation library
[Browserify](http://browserify.org/) | JavaScript CommonJS module library

### Stylesheets

Technology | Overview
--- | ---
[SASS](http://sass-lang.com/) | CSS Preprocessor
[Bootstrap](http://getbootstrap.com/) | Responsive Grid Framework (we are using the SaSS port of this provided via bower)
[Normalize](http://necolas.github.io/normalize.css/) | CSS Browser Normalizer
[AutoPrefixer](https://github.com/postcss/autoprefixer) | Automatically apply vendor prefixes

### Testing

Technology | Overview
--- | ---


### Utilities

Technology | Overview
--- | ---
[Assemble.IO](http://assemble.io/) | Static site generator
[svg-sprite](https://github.com/jkphl/svg-sprite) | Converts `.svg` into spritemaps


## Commands

Below are the available `gulp` commands that can be run from the CLI

Job | Description
--- | ---
`gulp` | Default job used for starting watcher and dev server
`gulp build` | Build production build into `build` folder
`gulp release` | Build release artifact 
