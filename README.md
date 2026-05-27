# UML Diagram Editor

This project is a UML diagram editor built with React, TypeScript, and Vite. It allows users to visually create, edit, and manage UML class diagrams in a modern, fast, and easy way. The architecture is designed for maintainability and extensibility, following SOLID principles and centralized state management.

## Preferences

For the moment it works better in a Chromium browser principally because of the use of:

```css
interpolate-size: allow-keywords;
```

Which is a modern feature only available in chrome for the moment.

## Dev Notes


While testing the project I saw a bug that made me understand why using `constructor.name` for type checking is wrong. Vite/Terser minifies class names in the production bundle (`MyCustomObject` becomes something like `t`), so a string comparison against the original name always fails in prod but works in dev.

```js
import MyCustomObject from './MyCustomObject';

// unsafe: breaks in production after minification
if (obj.constructor.name === 'MyCustomObject') {
  console.log('this works locally but fails in production')
}

// safe: instanceof checks the prototype chain by reference, not by name string
if (obj instanceof MyCustomObject) {
  console.log('works everywhere')
}
```

I knew this was a pretty bad practice but I did it the bad way to test what would happen, and I ended up learning some stuff.

# Run the project locally

Make sure you have Node.js and npm installed on your system.

With these commands is enough:

```bash
npm i
npm run dev
```
