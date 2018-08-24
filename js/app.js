

var app = angular.module('order', ['ngRoute','customer','ui.bootstrap','uiGmapgoogle-maps']);

app.config( function($routeProvider) {
  $routeProvider.
  when('/customer', {
    templateUrl: 'partials/list.html',
    controller: 'customer'
  }).
  when('/customer/:id', {
    templateUrl: 'partials/details.html',
    controller: 'single_customer'
  }).
  otherwise({
    redirectTo: '/customer'
  });
});