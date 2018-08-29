

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
  otherwise({
    redirectTo: '/'
  });
});

// app.factory('CustomerService',function($http){

// 	return {

//     addCustomerToDb : function(customer){
		
//       $http.post('localhost:4000/new_info', customer).then(function (response) {
//               //alert(JSON.stringify(data))
//               $scope.customer = response ; 
//               }
//           );

//     //   return $http({
//     //     method:"POST",
//     //     url: "localhost:4000/new_info",
//     //     customer:customer
//     // });
  
//     }

//   }	

// });

// app.controller("new_info", 
// 	 function($scope, $routeParams,$http)
// 		{    
// 			$scope.register = function () {
      
// 				// CustomerService.addCustomerToDb($scope.customer).then(function(response){
// 				// 	console.log(response.$scope.customer);

//         // })
        
//         $http.post('localhost:4000/new_info', customer).then(function (response) {
//                         //alert(JSON.stringify(data))
//                         $scope.customer = response ; 
//                         console.log($scope.customer)
//                         }
//                     );

//     }
//   }
// );
