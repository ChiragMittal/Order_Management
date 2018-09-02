

var app = angular.module('order', ['ngRoute','customer','ui.bootstrap','uiGmapgoogle-maps']);

app.config( function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/list.html',
    controller: 'customer'
  }).
  when('/customer/:id', {
    templateUrl: 'partials/details.html',
    controller: 'single_customer'
  }).
  when('/customer/order_list/:id', {
    templateUrl: 'partials/order.html',
    controller: 'order'
  }).
  when('/new_info', {
    templateUrl: 'partials/new.html',
    controller: 'new_info'
  }).
  when('/customer/edit_info/:id', {
    templateUrl: 'partials/edit.html',
    controller: 'edit_info'
  }).
  otherwise({
    redirectTo: '/'
  });
});

