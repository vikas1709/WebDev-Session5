import angular from 'angular';
import ngRoute from 'angular-route';
import navitems from './src/navitems';
import ngSanitize from 'angular-sanitize';
const app = angular.module('myApp', ['ngRoute','ngSanitize']);

app.config(function config($locationProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        template: '<greet-user />'
      })
      .when('/bye', {
        template: '<bye-user />'
      })
      .otherwise('/404');
      $locationProvider.html5Mode(true);
  });

app.controller('NavController', function($scope) {
    $scope.navitems = navitems;
  });
app.controller('ContentController', function($scope) {
    $scope.navitems = navitems;
  });
app.component('greetUser', {
    template:`<h1><a href="/bye">Hello, {{$ctrl.user}}!</a></h1>`,
  controller: function GreetUserController() {
    this.user = 'world';
  }
});

app.component('byeUser', {
    template: `Bye, {{$ctrl.user}}!`,
    controller: function ByeUserController() {
      this.user = 'cruel world';
    }
  });
// import angular from 'angular';

// const app = angular.module('myApp', []);
// app.controller('myCtrl', function($scope) {
//   $scope.name = 'John Doe';
// });
import angular from 'angular';

angular.module('myApp', []);

angular.module('myApp').component('greetUser', {
  template: 'Hello, {{$ctrl.user}}!',
  controller: function GreetUserController() {
    this.user = 'world';
  }
});
