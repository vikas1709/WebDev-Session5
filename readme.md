#Session 5 (placeholder only)

app.get('/recipes', (req, res) => {
    res.sendFile(__dirname + '/public/recipes.html')
})


<div class="panel panel2 active">
   <a href="recipes">Recipes</a>
</div>


<script src="https://code.angularjs.org/1.5.8/angular.js"></script>

`var app = angular.module('foodApp', []);``

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


```
<div>
  <recipe-list></recipe-list>
</div>
```

```
angular.module('foodApp').directive('navBar', function(){
  return {
    scope: true,
    templateUrl: 'includes/nav.html'
  };
})

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























