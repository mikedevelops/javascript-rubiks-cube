# boilerplate
A starting point. SCSS compilation & Javascript Bundling.
```
|-- boilerplate
    |-- javascript
    |   |-- index.js
    |   |-- src
    |-- scss
        |-- main.scss
    |-- public
    |   |-- index.html
    |   |-- dist
    |       |-- app.css
    |       |-- bundle.js
```

`npm install`
- Install dependencies

`npm start`
- Compile SCSS
- Autoprefix CSS
- Bundle Javascript [es2015]
- Lint Javascript
- Serve with browser-sync

`npm prod`

- Compile SCSS [compressed]
- Autoprefix CSS
- Bundle Javascript
- Lint Javascript
- Minify Javascript
