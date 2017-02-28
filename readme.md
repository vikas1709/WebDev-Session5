#Session 5

##Components

Set up a simple html page bootstrapped with Angular (code.angularjs.org):

```
<!DOCTYPE html>
<html>

<head>
    <title>AngularJS Module</title>
    <script src="https://code.angularjs.org/1.6.2/angular.js"></script>
    <script src="test.js"></script>
</head>

<body>
    <div ng-app="myApp">
        <div ng-controller="GreetUserController">
            <p>Hello {{ user }}</p>
        </div>
    </div>
</body>
</html>
```

test.js:

```
angular.module('myApp', []);

angular.module('myApp').controller('GreetUserController', function( $scope ){
    $scope.user = 'John'
})
```

refactored:

```
var myApp = angular.module('myApp', []);

myApp.controller('GreetUserController', $scope  =>  $scope.user = 'John' )
```

###Create a component

Components are referenced directly in the html:

```
<div ng-app="myApp">
  <greet-user></greet-user>
</div>
```

A component references an object that contains both the template and the controller. 

Note the use of $ctrl for components as opposed to global $scope. Here the data is exclusive to a specific controller. Also, the html uses hyphens while the component uses camel case.

```
var myApp = angular.module('myApp', []);

myApp.component('greetUser', {
    template: 'Hello, {{ $ctrl.user }}!',
    controller: function GreetUserController() {
        this.user = 'world';
    }
});
```

###Create multiple components:

Add a second component: 

```
myApp.component('greetUser', {
    template: 'Hello, {{ $ctrl.user }}!',
    controller: function GreetUserController() {
        this.user = 'world';
    }
});


myApp.component('byeUser', {
    template: 'Bye, {{$ctrl.user}}!',
    controller: function ByeUserController() {
        this.user = 'cruel world';
    }
});
```

```
<body>
    <div ng-app="myApp">
        <greet-user></greet-user>
        <bye-user></bye-user>
    </div>
</body>
```


###Add routing

If we want to swap out components we use Angular for routing a SPA, not express routing. 

Use express routes for handling data and authentication. (Always include a single route for index.html.) 

Angular routes handle the view (templates) and the logic (controllers) for the views.

`<script src="https://code.angularjs.org/1.6.2/angular-route.js"></script>`

```
var myApp = angular.module('myApp', ['ngRoute']);
```

```
myApp.config(
    function config($routeProvider) {
        $routeProvider.
        when('/', {
            template: 'Hello, {{user}}!',
            controller: 'GreetUserController'
        }).
        when('/bye', {
            template: 'Bye, {{user}}!',
            controller: 'ByeUserController'
        }).
        otherwise('/404');
    });

myApp.controller('GreetUserController', function($scope){
    $scope.user = 'world';
})

myApp.controller('ByeUserController', function($scope){
    $scope.user = 'cruel world';
})
```

Because we are not using components we are back to using $scope.

ng-view

```
<div ng-app="myApp">
    <div ng-view></div>
</div>
```

Note the url string now includes the hash and a bang ('!'). 

Go to `http://localhost:3000/#!/bye`

###Add Components

The routing specifies a template defined by a component.

Hash prefixes and be set using $locationProvider (defaults to !).

```
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/', {
            template: '<greet-user></greet-user>'
        }).
        when('/bye', {
            template: '<bye-user></bye-user>'
        }).
        otherwise('/404');
    });

myApp.component('greetUser', {
    template: 'Hello, {{$ctrl.user}}!',
    controller: function GreetUserController() {
        this.user = 'world';
    }
});

myApp.component('byeUser', {
    template: 'Bye, {{$ctrl.user}}!',
    controller: function ByeUserController() {
        this.user = 'cruel world';
    }
});
```

###Linking

```
myApp.component('greetUser', {
    template: `
    <h4>Hello, {{ $ctrl.user }}!</h4>
    <p><a href="#!/bye">Bye</a></p>
    `,
    controller: function GreetUserController() {
        this.user = 'world';
    }
});
```
In the config:

`$locationProvider.html5Mode(true);`

In index.html:

`<base href="/">`


##Recipe Site

Examine package.json, app.js, index.html and scripts.js

`sudo npm install`

`npm run boom!`

Allow express to use public as a source for static files and our Angular work:

`app.use(express.static('public'))`

Creating an express route? No!

```
app.get('/recipes', (req, res) => {
    res.sendFile(__dirname + '/public/recipes.html')
})
```

```
<div class="panel panel2 active">
   <a href="/recipes">Recipes</a>
</div>
```

Routing in a spa is best done using the hash structure (no page refresh).

`<script src="https://code.angularjs.org/1.5.8/angular.js"></script>`

`<body ng-app="foodApp">`

Create `foodapp.module.js`

`var app = angular.module('foodApp', []);`

and link it: `<script src="js/foodapp.module.js"></script>`

Create recipes folder in js.

Create `recipe-list.component.js` and link it.

```
angular.module('foodApp').component('recipeList', {
    template:
    `<h1>test</h1>`,
    controller: function RecipeListController() {

    }
});
```

```
<div>
  <recipe-list></recipe-list>
</div>
```

Debug!

Add a template and data to the controller:

```
angular.module('foodApp').component('recipeList', {
  template:
  `
  <div>
  <ul>
      <li ng-repeat="recipe in $ctrl.recipes">
          <img ng-src="img/home/{{ recipe.image }}">
          <h1><a href="#0">{{ recipe.title }}</a></h1>
          <p>{{ recipe.description }}</p>
      </li>
  </ul>
  </div>
  `,

  controller: function RecipeListController( ) {
    this.recipes = [
    {
      name: 'recipe1309',
      title: 'Lasagna',
      date: '2013-09-01',
      description: 'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
      image: 'lasagne.png'
    },
    {
      name: 'recipe1404',
      title: 'Pho-Chicken Noodle Soup',
      date: '2014-04-15',
      description: 'Pho (pronounced “fuh”) is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
      image: 'pho.png'
    },
    {
      name: 'recipe1210',
      title: 'Guacamole',
      date: '2012-10-01',
      description: 'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor – with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
      image: 'guacamole.png'
    },
    {
      name: 'recipe1810',
      title: 'Hamburger',
      date: '2012-10-20',
      description: 'A Hamburger (or often called as burger) is a type of food in the form of a rounded bread sliced in half and its Center is filled with patty which is usually taken from the meat, then the vegetables be lettuce, tomatoes and onions.',
      image: 'hamburger.png'
    }
    ];
  }
});
```

Note the break down of the elements into separate js files.

js > recipes > recipe-list.template.html

`templateUrl: 'js/recipes/recipe-list.template.html',`

###Format the recipes

```
<div class="wrap">
    <ul>
        <li ng-repeat="recipe in $ctrl.recipes">
            <img ng-src="img/home/{{ recipe.image }}">
            <div>
            <h1><a href="#0">{{ recipe.title }}</a></h1>
            <p>{{ recipe.description }}</p>
            </div>
        </li>
    </ul>
</div>
```

styles.scss:

```
@import 'imports/recipe-list'; 
```

recipes.scss

```
.wrap {
    background: #eee;
    max-width: 940px;
    margin: 0 auto;
    ul {
        list-style: none;
    }
    li {
        display: flex;
        padding: 1rem;
        img {
            width: 30%;
            height:100%;
            padding: 1rem;
        }
        h1 {
            font-family: lobster;
            a {
                color: #666;
                text-decoration: none;
            }
        }
    }
}
```

###Routing

Wire up the main nav.

`<script src="https://code.angularjs.org/1.6.2/angular-route.js"></script>`

`<script src="js/foodapp.config.js"></script>`

`<base href="/">`

`angular.module('foodApp', ['ngRoute']);`

```
angular.module('foodApp').config(

  function config($locationProvider, $routeProvider) {
    $routeProvider.
    when('/', {
      template: 'test'
    }).
    when('/recipes', {
      template: 'test2'
    }).
    otherwise('/404');

    $locationProvider.html5Mode(true);
  });
  ```

```
<div>
  <div ng-view></div>
</div>
```

```
<div class="panel panel1">
    <a href="/">Home</a>
</div>
<div class="panel panel2 active">
    <a href="/recipes">Recipes</a>
</div>
```

```
angular.module('foodApp').config(

  function config($locationProvider, $routeProvider) {
    $routeProvider.
    when('/', {
      template: 'test'
    }).
    when('/recipes', {
      template: '<recipe-list></recipe-list>'
    }).
    otherwise('/404');

    $locationProvider.html5Mode(true);
  });
```



###Notes

<nav ng-include=" 'includes/nav.html' "></nav>


```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Recipes</title>
  <script src="https://code.angularjs.org/1.6.2/angular.min.js"></script>
  <script src="https://code.angularjs.org/1.6.2/angular-route.js"></script>
  <script src="js/foodapp.module.js"></script>
  <script src="js/foodapp.config.js"></script>
  <script src="js/recipes/recipe-list.component.js"></script>

  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">

  <base href="/">
</head>
<body ng-app="foodApp">
  <nav ng-include=" 'includes/nav.html' "></nav>
  <div ng-view></div>
  <script src="js/scripts.js"></script>
</body>
</html>
```


















