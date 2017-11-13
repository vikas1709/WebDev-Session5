# Session 5

## Angular as a Templating Engine

Let's look at Angular as our page templating language.

In the terminal, cd into the angular folder and set it up with npm install and run `nodemon app.js`

Add a link to Angular in the head of index.html:

`<script src="https://code.angularjs.org/1.5.8/angular.js"></script>`

HTML5 introduced the `data-` [attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

Angular uses this concept to extend html with [directives](https://www.w3schools.com/angular/angular_directives.asp) such as data-ng-app, data-ng-controller, data-ng-repeat

`<html lang="en"  data-ng-app>`



### Angular Directives

Simple Angular directives:

1. ng-app − This directive starts an AngularJS Application. We use it to create [Modules](https://docs.angularjs.org/guide/module)
2. ng-init − This directive initializes application data. (We won't use it except for the simple examples below.)
3. ng-model − This directive defines the model that is variable to be used in AngularJS.
4. ng-repeat − This directive repeats html elements for each item in a collection.

```html
<div class="site-wrap"  ng-init="messageText = 'Hello World!'">

<input ng-model="messageText" size="30"/>
<p>Everybody shout "{{ messageText | uppercase }}"</p>
```

This is a demonstration of [data binding](https://docs.angularjs.org/guide/databinding) and [filtering](https://docs.angularjs.org/api/ng/filter) to uppercase.

Alernates 1 - using an object

`ng-init="greeting = { greeter: 'Daniel' , message: 'Hello World' }"`

```html
<input type="text" ng-model="greeting.greeter" size="30"/>
<input type="text" ng-model="greeting.message" size="30"/>
{{greeting.greeter }} says "{{ greeting.message }}"
```

Alternates 2 - using ng-repeat with an array

```html
<div class="site-wrap" ng-init="portfolios = ['Call of Booty', 'The Sack of the Innocents', 'Pipe and First Mate']" >

<ul>
  <li ng-repeat="portfolio in portfolios">
    {{ portfolio }}
  </li>
</ul>
```

Alernate 3 - [filtering](https://docs.angularjs.org/api/ng/filter) and ordering on an array of objects

```html
<div class="site-wrap" ng-init="portfolios = [
{ name: 'Call of Booty', date: '2013-09-01' },
{ name: 'The Sack of the Innocents', date: '2014-04-15' },
{ name: 'Pipe and First Mate', date: '2012-10-01' } ]">

<p>Filter list: <input ng-model="searchFor" size="30"/></p>

<ul>
  <li ng-repeat="portfolio in portfolios | filter:searchFor | orderBy:'date' ">
  {{ portfolio.name  }}</li>
</ul>
```

ngClass:

```html
<ul>
  <li ng-repeat="portfolio in portfolios |
  filter:searchFor |
  orderBy:'date'"
  ng-class="{ even: $even, odd: $odd }">
  {{ portfolio.name  }}</li>
</ul>
```

with:

```html
<style>
  .even { color: red; }
  .odd { color: blue; }
</style>
```

keys and values of the array:

```html
<ul>
  <li ng-repeat="(key, value) in portfolios">
      <strong>{{key}}</strong> - {{value}}
  </li>
</ul>
```

## Components

Create: `test.js`:

```js
angular.module('myApp', []);

angular.module('myApp').component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
        this.user = 'world';
    }
});
```

Create `test.html`:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>AngularJS Module</title>
  <script src="https://code.angularjs.org/1.5.8/angular.js"></script>
  <script src="test.js"></script>
</head>

<body>

  <div ng-app="myApp">
    <greet-user></greet-user>
  </div>

</body>

</html>
```


## Angular on Express


npm install [express generator](http://expressjs.com/en/starter/generator.html)

Create a new empty directory and `cd` into it.

Generate a site:

`express --view=pug myapp --css sass`

run:

`npm install` and `DEBUG=myapp:* npm start` (see [generator page](http://expressjs.com/en/starter/generator.html) for Windows alternative)

Inspect the new directory.

Test it at `http://localhost:3000/` using:

Routes:

```js
res.render('index', { title: 'Express', animal: req.query.animal });
```

Pug: variables into text (in views):

```
`p.hello My animal's name is #{animal}`
```

```
http://localhost:3000/?animal=dog
```

Restart the server.

Set node command to nodemon in package.json (be sure you have nodemon installed first):

```js
  "scripts": {
    "start": "nodemon ./bin/www"
  },
```

Pug variables into attributes:

```
img.animal(src="animal.jpg" alt="#{animal}")
```

or use js:

```
img.animal(src="animal.jpg" alt=`${animal}`)
```

```
- const upAnimal = animal.toUpperCase()
p My animal is #{upAnimal}
```

## Babel

Additional installs for webpack and babel.

`$ npm i --save-dev babel-core babel-loader babel-preset-env webpack concurrently`

Demo on babeljs.io:

```js
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
```

We'll be using babel with webpack:

`https://babeljs.io/docs/setup/#installation`

create webpack.config.js

```js
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './myapp.js',
    output: {
        filename: './public/javascripts/bundle.js'
    }
}
```

Create empty `myapp.js`

```js
const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: './myapp.js',
	output: {
		filename: './public/javascripts/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env']
			}
		}]
	}
}
```

Add webpack and a boom to our scripts:

```js
  "scripts": {
    "start": "nodemon ./bin/www",
    "build": "webpack --progress --watch",
    "boom!": "concurrently \"npm run start\" \"npm run build\" "
  },
```

`npm run boom!`

Note bundle.js and map.

Add link to layout.jade (be sure to use spaces or tabs:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
    script(src='/javascripts/bundle.js')
```

Add an #output div:

```
extends layout

block content
  h1= title
  p Welcome to #{title}
  - const upAnimal = animal.toUpperCase()
  p My animal is #{upAnimal}
  #output
```

Create myapp.js

Restart the server using the `boom!` command and add to `myapp.js`:

```js
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
```

Test with lodash in myapp.

```js
import { uniq } from 'lodash';

const person = [ 1,1,3,45,8,67,8 ]

console.log(uniq(person))
```

Note: your bundle just got pretty large.

Add uglify processing to webpack

```js
const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: './myapp.js',
	output: {
		filename: './public/javascripts/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env']
			}
		}]
	},
	plugins: [
	new webpack.optimize.UglifyJsPlugin({
		compress: { warnings: false },
		output: { comments: false },
		sourceMap: true
	})
	]
}
```

and restart the processes with boom!

## API Key

Create `src` directory with `config.js` inside.

Edit config.js:

```js
const apiKey = 'abcdef'
```

Import it into myapp.js (note: paths are not necessary for node modules):

```js
import apiKey from './src/config';
console.log(apiKey);
```

Refresh the browser. Note empty object.

Export the data - using *default* and *named* exports.

In config.js:

```js
const apiKey = 'abcdef';

export default apiKey;
```

Refresh the browser. Note new variable.

Because we exported is as default we can rename on import.

```js
import foo from './src/config';
console.log(foo);
```

Modules can only have one default export but *can* have multiple named exports.

A named export:

`export const apiKey = 'abcdef';`

requires an import that looks like:

```js
import {apiKey} from './src/config';
console.log(apiKey);
```

Multiple named exports:

```js
export const apiKey = 'abcdef';
export const url = 'https://mlab.com';
```

```js
import {apiKey, url} from './src/config';
console.log(apiKey, url);
```

Multiple named exports encourage code encapsulation and reuse across multiple projects.

Functions can be internal to a module or exported:

```js
export const apiKey = 'abcdef';
export const url = 'https://mlab.com';

export function sayHi(name){
	console.log(`Say hello ${name}`)
}
```

```js
import {apiKey, url, sayHi} from './src/config';
sayHi('daniel');
```

See [the documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) on MDN for options including `import as`, `export as` and exporting multiples.

Note the resemblance (and difference) between module importing above and Node.

routes > index.js

```js
module.exports = router;
```

app.js:

```js
var routes = require('./routes/index');
```


## Angular as a Templating Engine

Let's look at using an older (but still quite common and actively maintained) version of Angular as our page templating language.

Remove views and jade in app.js

```js
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
```

Add to routes index.js:

```js
  // res.render('index', { title: 'Express', animal: req.query.animal });
  res.sendFile(__dirname + '/public/index.html')
```

Create index.html page in public:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<p>It works!</p>
</body>
</html>
```

Link to bundle.js

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="javascripts/bundle.js"></script>
</head>
<body>
	<p>It works!</p>
</body>
</html>
```

Install angular:

`npm install angular@1.6.2 --save`

Import it into myapp.js:

```js
import angular from 'angular';
import { uniq } from 'lodash';

const ages = [1, 1, 4, 52, 12, 4]
console.log(uniq(ages)); 
```

Remove uglify processing from webpack.

```js
const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',
	entry: './myapp.js',
	output: {
		filename: './public/javascripts/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env']
			}
		}]
	}
}
```

HTML5 introduced the `data-` [attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

Angular uses this concept to extend html with [directives](https://www.w3schools.com/angular/angular_directives.asp) such as data-ng-app, data-ng-controller, data-ng-repeat

`<html lang="en"  data-ng-app>`

```html
<!DOCTYPE html>
<html lang="en" data-ng-app>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="/javascripts/bundle.js"></script>
</head>

<body>
    <p>It works</p>
</body>

</html>
```


### Angular Directives

Simple Angular directives:

1. ng-app − this directive starts an AngularJS application in the code block where it is inserted. We will use it to create [Modules](https://docs.angularjs.org/guide/module)
1. ng-init − this directive initializes application data. (We won't using it beyond the simple examples below)
1. ng-model − this directive binds an input, select, or textarea to our data
1. ng-repeat − this directive repeats html elements for each item in a collection

```html
	<div class="site-wrap"  ng-init="messageText = 'Hello World!'">
		<input ng-model="messageText" size="30"/>
		<p>Everybody shout "{{ messageText | uppercase }}"</p>
	</div>
```

This is a demonstration of [data binding](https://docs.angularjs.org/guide/databinding) and [filtering](https://docs.angularjs.org/api/ng/filter) to uppercase.

Alternates 1 - using an object, e.g.:

`greeting = { greeter: 'Daniel' , message: 'Hello World' }`

```html
	<div class="site-wrap"  ng-init="greeting = { greeter: 'Daniel' , message: 'Hello World' }"">
		<input type="text" ng-model="greeting.greeter" size="30"/>
<input type="text" ng-model="greeting.message" size="30"/>
		<p>{{greeting.greeter }} says "{{ greeting.message }}</p>
	</div>```

Alternates 2 - using ng-repeat with an array

```html
	<div class="site-wrap" ng-init="portfolios = ['Call of Booty', 'The Sack of the Innocents', 'Pipe and First Mate']" >
		<ul>
			<li ng-repeat="portfolio in portfolios">
				{{ portfolio }}
			</li>
		</ul>
	</div>
```

Alernate 3 - [filtering](https://docs.angularjs.org/api/ng/filter) and ordering on an array of objects

```html
<div class="site-wrap" ng-init="portfolios = [
{ name: 'Call of Booty', date: '2013-09-01' },
{ name: 'The Sack of the Innocents', date: '2014-04-15' },
{ name: 'Pipe and First Mate', date: '2012-10-01' } ]">

<p>Filter list: <input ng-model="searchFor" size="30"/></p>

<ul>
  <li ng-repeat="portfolio in portfolios | filter:searchFor | orderBy:'date' ">
  {{ portfolio.name  }}</li>
</ul>
```

ngClass:

```html
<ul>
  <li ng-repeat="portfolio in portfolios |
  filter:searchFor |
  orderBy:'date'"
  ng-class="{ even: $even, odd: $odd }">
  {{ portfolio.name  }}</li>
</ul>
```

with:

```html
<style>
  .even { color: red; }
  .odd { color: blue; }
</style>
```

keys and values of the array:

```html
	<div class="site-wrap" ng-init="portfolios = [
	{ name: 'Call of Booty', date: '2013-09-01' },
	{ name: 'The Sack of the Innocents', date: '2014-04-15' },
	{ name: 'Pipe and First Mate', date: '2012-10-01' } ]">

	<ul>
		<li ng-repeat="(key, value) in portfolios">
			<strong>{{key}}</strong> - {{value}}
		</li>
	</ul>
```

## Named Apps

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="javascripts/bundle.js"></script>
</head>
<body>
	<div class="site-wrap" data-ng-app=myApp >
		<div data-ng-controller="myCtrl">
			Name: <input data-ng-model="name">
		</div>
	</div>
</body>
</html>
```

In myapp.js:

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.name = "John Doe";
});
```

## Components

Custom tags that can move templates into and out of html.

myapp.js

```js
import angular from 'angular';

angular.module('myApp', []);

angular.module('myApp').component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
        this.user = 'world';
    }
});
```

`index.html`:

```html
<body>

  <div ng-app="myApp">
    <greet-user></greet-user>
  </div>

</body>
```

## PROCESS

Place a section of the page under the influence of an Angular controller:

```html
<!DOCTYPE html>
<html lang="en" data-ng-app="myApp">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="javascripts/bundle.js"></script>
</head>
<body>
	<nav data-ng-controller="NavController">
		
	</nav>
</body>
</html>
```

navitems.js:

```
const navItems = [
{
  label: 'Watchlist',
  link: 'watchlist',
  header: 'Market intelligence now revolves around what you need',
  content: `
  <ul>
  <li>Create topical tiles with the content you want</li>
  <li>Access subscribed research without having to check your email</li>
  <li>Compile and share research based on your interests</li>
  <li>Access your Barclays Live charts on the go</li>
  <li>Go deeper into topics in your own time, online or offline</li>
  </ul>`
},
{
  label: 'Research',
  link: 'research',
  header: 'Accessing your content has never been easier',
  content: `
  <ul>
  <li>Filter content by asset class, region, industry or currency</li>
  <li>View what’s trending today, this week, this month</li>
  <li>Browse a magazine or publication and add it to your Watchlist</li>
  <li>Select text in publications to highlight and annotate</li>
  <li>Create a Quick List and save it to your Workbook for easy access in the future</li>
  </ul>`
},
{
  label: 'Markets',
  link: 'markets',
  header: 'The pulse of the market is right at your fingertips',
  content: `
  <ul>
  <li>Check live FX pricing from BARX</li>
  <li>Monitor market data across asset classes</li>
  <li>Access Barclays Indices, Credit Center, TRENDS and more</li>
  <li>View companies under coverage across equities and credit</li>
  <li>Access financial forecasts from our equity analysts</li>
  </ul>`
},
{
  label: 'Workbook',
  link: 'workbook',
  header: 'Save and organize content for offline reading',
  content: `
  <ul>
  <li>Look for Add to Workbook wherever you are in the app</li>
  <li>Create folders in your Workbook with the content you like</li>
  <li>Add your annotated publications to the Workbook</li>
  <li>Access content in your Workbook online or offline</li>
  </ul>`
},
{
  label: 'Connect',
  link: 'connect',
  header: 'A new interactive experience',
  content: `
  <ul>
  <li>View messages from your Barclays research analysts and sales teams</li>
  <li>Reply to your Barclays contacts on the go</li>
  <li>Share tiles, publications and charts</li>
  <li>Read messages seamlessly on your tablet and via email</li>
  </ul>`
},
{
  label: 'Desktop',
  link: 'desktop',
  header: 'Start on your tablet, continue on the desktop',
  content: `
  <ul>
  <li>Work seamlessly on the desktop and on your tablet</li>
  <li>View your Watchlist, your Workbook and Connect from the tablet and the desktop</li>
  <li>Create charts on the desktop and view them on the app</li>
  </ul>`
},
{
  label: 'FAQ',
  link: 'faq',
  header: 'FAQ',
  content: `
  <ul>
  <li>Work seamlessly on the desktop and on your tablet</li>
  <li>View your Watchlist, your Workbook and Connect from the tablet and the desktop</li>
  <li>Create charts on the desktop and view them on the app</li>
  </ul>`
}];

```

At bottom of navItems:

`export default navitems;`

Import into myapp.js:

```
import angular from 'angular';
import navitems from './src/navitems';
console.log(navitems);
```

Declare app to be an instance of an Angular module:

`var app = angular.module('myApp', []);`

`app` is the main Angular space and can be broken down into multiple controllers.

Add our data to the NavController:

```js
import angular from 'angular';
import navitems from './src/navitems';
console.log(navitems); 

var app = angular.module('myApp', []);

app.controller("NavController", function( $scope ) {
  $scope.navitems = navitems
  })
```

[Scope](https://docs.angularjs.org/guide/scope#!) is the glue between application controller and the view.

Test to see if it is available in our view.

Use Angular to build out again in index.html:

```html
	<nav data-ng-controller="NavController">
		<ul id="nav-links">
			<li data-ng-repeat="navitem in navitems">
				<a href=#{{navitem.link}}>{{navitem.label}}</a>
			</li>
		</ul>
	</nav>
```

`{{  }}` - moustaches or handlebars are similar to JavaScript Template Strings (`${   }`). These are known as [expressions](https://docs.angularjs.org/guide/expression).

`ng-repeat` is a directive. There are [many directives](https://docs.angularjs.org/api/).

Build out the content:

```html
	<div data-ng-controller="ContentController">
		<div data-ng-repeat="navitem in navitems">
			<h2>{{ navitem.label }}</h2>
			<h3>{{ navitem.header }}</h3>
		</div>
	</div>
```

```
app.controller("ContentController", function( $scope ) {
  $scope.navitems = navitems
  })
```

Note - injecting html into a page is considered unsafe. 

Try adding `{{ navitem.content }}`:

```html
	<div data-ng-controller="ContentController">
		<div data-ng-repeat="navitem in navitems">
			<h2>{{ navitem.label }}</h2>
			<h3>{{ navitem.header }}</h3>
			{{ navitem.content }}
		</div>
	</div>
```

Load [sanitize](https://docs.angularjs.org/api/ngSanitize):

Back in the 'old' days you would use the `<script>` ta, e.g.:
`<script src="https://code.angularjs.org/1.5.8/angular-sanitize.min.js"></script>`

Today we are using webpack and bundling

`npm install angular-sanitize@1.6.2 --save`

```js
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
```

Use [injection](https://docs.angularjs.org/guide/di) to make it available to the app:

`var app = angular.module('myApp', ['ngSanitize']);`

We can then use:

`<div ng-bind-html="navitem.content"></div>`

## Notes


`npm install angular-route@1.6.2 --save-dev`

`import ngRoute from 'angular-route';`