var app = angular.module('order', ['ngRoute','customer','ui.bootstrap']);

app.config( function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'list.html',
    controller: 'customer'
  }).
  when('/customer/:id', {
    templateUrl: 'details.html',
    controller: 'single_customer'
  }).
  when('/customer/order_list/:id', {
    templateUrl: 'order.html',
    controller: 'order'
  }).
  when('/new_info', {
    templateUrl: 'new.html',
    controller: 'new_info'
  }).
  when('/customer/edit_info/:id', {
    templateUrl: 'edit.html',
    controller: 'edit_info'
  }).
  otherwise({
    redirectTo: '/'
  });
});

