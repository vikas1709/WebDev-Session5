#Session 5 (placeholder only)

##Components

Set up a simple html page bootstrapped with Angular (code.angularjs.org):

```
<!DOCTYPE html>
<html>

<head>
    <title>AngularJS Module</title>
    <script src="https://code.angularjs.org/1.6.1/angular.js"></script>
    <script src="test.js"></script>
</head>

<body>
    <div ng-app="myApp">
        <div ng-controller="UserController">
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

###Create a component:

```
<div ng-app="myApp">
  <greet-user></greet-user>
</div>
```

Use a component contains both the template and the controller:

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

`<script src="https://code.angularjs.org/1.6.1/angular-route.js"></script>`

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

```
<div ng-app="myApp">
    <div ng-view></div>
</div>
```

###Add Components

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
    <p><a href="/bye">Bye</a></p>
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

`var app = angular.module('foodApp', []);`

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

Break down the elements into separate js files.

js > recipes > recipes-template.html

`templateUrl: 'js/recipes/recipes-template.html',`

js > recipes > recipes-list.component.js

js > foodapp.module.js

`angular.module('foodApp', []);`

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
@import 'imports/panels';
@import 'imports/recipes'; 
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
            a {
                color: #666;
                text-decoration: none;
            }
        }
    }
}
```




###Notes

```
angular.module('foodApp').directive('navBar', function(){
  return {
    scope: true,
    templateUrl: 'includes/nav.html'
  };
})
```

<nav ng-include=" 'includes/nav.html' "></nav>

```
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/recipes', (req, res) => {
    res.sendFile(__dirname + '/public/recipes.html')
})
```


```
<!DOCTYPE html>
<html lang="en" ng-app="recipeApp">
<head>
  <meta charset="UTF-8">
  <title>Recipes</title>
  <script src="https://code.angularjs.org/1.6.1/angular.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body class="home">

  <nav ng-include=" 'includes/nav.html' "></nav>

  <h1>Home</h1>

  <script src="/js/scripts.js"></script>

</body>
</html>
```





###Directive

`<nav-bar></nav-bar>`

```
<nav>
  <div class="panels">
    <div class="panel panel1">
      <a href="/">Home</a>
    </div>
    <div class="panel panel2">
      <a href="recipes">Recipes</a>
    </div>
    <div class="panel panel3">
      <a href="reviews">Reviews</a>
    </div>
    <div class="panel panel4">
      <a href="delivery">Delivery</a>
    </div>
    <div class="panel panel5">
      <a href="about">About</a>
    </div>
  </div>
</nav>
```























