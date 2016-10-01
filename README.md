# boilerplate
A starting point. SCSS compilation & Javascript Bundling.
```
|-- boilerplate
    |-- package.json
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
