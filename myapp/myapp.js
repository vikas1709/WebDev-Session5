import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import navitems from './src/navitems';
console.log(navitems);

const app = angular.module('myApp', ['ngSanitize']);
// var app = angular.module('myApp', []);

app.controller('NavController', function($scope) {
	$scope.navitems = navitems;
});

app.controller('ContentController', function($scope) {
	$scope.navitems = navitems;
});

app.component('greetUser', {
	template: `Hello, {{$ctrl.user}}!`,
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
