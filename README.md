<div align="center">
  <img height="100" src="https://i.imgur.com/YPhoQOA.png">
  <h1 align="center">Space Kit</h1>
  <p>The home base for Apollo's design system, Space Kit provides essential design resources for our developers to use in the Apollo-branded interfaces that they create.</p>
  <img src="https://img.shields.io/npm/v/@apollo/space-kit.svg">
</div>

## Table of Contents <!-- omit in toc -->

- [Installation](#Installation)
- [Usage](#Usage)
- [Exports](#Exports)
  - [Stylesheet reset](#Stylesheet-reset)
  - [Colors](#Colors)
  - [Icons](#Icons)
- [Developing Space Kit](#Developing-Space-Kit)
  - [Icons](#Icons-1)
  - [TypeScript](#TypeScript)
  - [Storybook](#Storybook)
- [Resources](#Resources)

## Installation

```shell
npm install @apollo/space-kit
```

## Usage

Import things into your JS app from the `@apollo/space-kit` package. All available exports are documented [here](#exports).

```js
import "@apollo/space-kit/reset.css"; // import this at app root
import { colors } from "@apollo/space-kit";

function MyComponent() {
  return (
    <button
      style={{
        backgroundColor: colors.indigo.dark,
        color: "white",
        border: `1px solid ${colors.grey.light}`
      }}
    >
      ...
    </button>
  );
}
```

## Exports

- [Stylesheet reset](#stylesheet-reset)
- [Colors](#colors)
- [Icons](#icons)

### Stylesheet reset

A "base" stylesheet with a few sensible rules. It uses [normalize.css](https://necolas.github.io/normalize.css/) to smooth out any inconsistencies between the ways that different browsers render elements. It also applies `box-sizing: border-box;` to everything, for [a better element sizing experience](https://www.paulirish.com/2012/box-sizing-border-box-ftw/). Lastly, the stylesheet imports and sets our two main font families: [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro), and [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro).

You'll probably want to include this file once in your app, ideally at the top-most level. For instance, in a Gatsby site that would be your [`layout.js` component](https://www.gatsbyjs.org/docs/layout-components/).

**JS + webpack or similar**

```js
import "@apollo/space-kit/reset.css";
```

**LESS**

```less
@import (inline) "../node_modules/@apollo/space-kit/reset.css
```

### Colors

A JavaScript object that maps color names to palettes of hex codes to apply on-brand color to elements on a page. The available colors include:

- `pink`
- `teal`
- `indigo`
- `black`
- `grey`
- `silver`
- `red`
- `green`
- `blue`
- `orange`
- `yellow`
- `purple`

When you access a color by name (i.e. `colors.indigo`), you'll find a palette of hex codes keyed by a "lightness" variant. These include:

- `base`
- `dark`
- `darker`
- `darkest` (not on `black`, `grey`, or `silver`)
- `light`
- `lighter`
- `lightest` (not on `black`, `grey`, or `silver`)

**CSS-in-JS**

```jsx
import styled from "@emotion/styled";
import { colors } from "@apollo/space-kit";

const StyledButton = styled.button({
  backgroundColor: colors.indigo.dark,
  color: "white",
  border: `1px solid ${colors.grey.light}`
});

function MyComponent() {
  return (
    <div>
      <StyledButton>Save</StyledButton>
      <StyledButton
        style={{
          backgroundColor: colors.red.base
        }}
      >
        Delete
      </StyledButton>
    </div>
  );
}
```

### Icons

All our icons are displayed in a gallery in [Storybook](https://space-kit.netlify.com/?path=/story/space-kit--icons).

Note that there are no styles or classes applied to the SVGs by default; you'll have to add a `width` and `height` to see the icons; and apply a text color to color them.

All our icons are SVG files stored in [`./icons/src/svgs`](./icons/src/svgs). There are scripts set up to convert these SVGs into React components, and then to transpile those files for consumption. These conversions and transpilations are `.gitignore`'ed, so they are not mantained in source control.

These icons are _not_ open source and are only licensed for use in this project. See [license](./icons/LICENSE.md) for more details.

Please see [#developing-space-kit-icons](#icons-1) for instructions on adding new icons.

#### Example

```js
import React from "react";
import { IconServices } from "@apollo/space-kit/icons/IconServices";

export const IconServiceItem: React.FC = () => (
  <div className="w-5 h-5">
    <IconServices className="w-full h-full text-teal" />
  </div>
);
```

#### FAQ

##### My icons aren't showing up in the UI

Make sure that the icon component has a width and height applied to it. That can mean applying classes or styles directly to the Icon component, or setting the component to have `height: 100%` and `width: 100%` and then applying a size to the containing element.

##### Why can't I import from `IconServices` from `@apollo/space-kit/icons`?

My goal was to minimze the bundle size increase caused by using these icons. If I had named exports from `space-kit/icons`, then the user would have to make sure they are tree-shaking to only import the icons they are actually using. `engine-frontend` is _not_ yet tree-shaking, so we decided to not make the imports an option.

##### Why does each icon have a named export instead of a default export?

The engine-frontend team and Apollo OSS teams have decided to not use default exports; this continues that trend.

## Developing Space Kit

### Icons

To add new icons, add SVGs to [`./icons/src/svgs`](./icons/src/svgs) and open a pull request. The React components will be generated and the TypeScript will be transpiled automatically after merging to `master`.

The following scripts are available:

- `icons:clean`: Clean all the React components and TypeScript generated files from the `icons/` directory. This will not touch the raw svg files in `icons/src`.
- `icons:generate`: Generate TypeScript files for each icon. These will be immediately available in Storybook.
- `icons`: Run `icons:clean` and `icons:genreate` in series
- `build:typescript`: Transpile TypeScript files to be consumed externally.
- `watch`: Watch TypeScript files and automatically update.

  This is useful when you've `npm link`'ed this repository and are developing against another project.

### TypeScript

To watch all TypeScript projects for development, run the `npm run watch` script.

### Storybook

Many elements of Space Kit are showcased in Storybook, which can be used for local development by running:

```
npm install
npm run storybook
```

All pull requests will automatically generate deploy previews and the `master` branch is automatically deployed to https://space-kit.netlify.com.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d5469491-a3d2-4ee1-b31d-d7f87ae806f8/deploy-status)](https://app.netlify.com/sites/space-kit/deploys)

## Resources

- [Space Kit's style guide (Zeplin)](https://app.zeplin.io/project/5c7dcb5ab4e654bca8cde54d/screen/5cd0c46bce9a42346c709328)
- [Engine's style guide (Storybook)](https://storybook.apollographql.com)
