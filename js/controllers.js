

var customer = angular.module("customer", []);

customer.controller("customer",
	function($scope, $http,$timeout)
		{    
			// $http.get('js/data.json').success (function(data){
			// 	$scope.customers = data;

				 
			// });

		$http.get('http://localhost:4000/').success (function(data){
					$scope.customers = data;
					// $scope.whichCustomer = $routeParams.id;
					// console.log($scope.whichCustomer)
				$scope.totalItems = $scope.customers.length;
					console.log($scope.customers)
				}); 

			$scope.cardView = true;
		    $scope.listView = false;
		    $scope.mapView = false;
	
		 $scope.map = { 
		      center: { latitude: 39.8282, longitude: -98.5795 }, 
		      zoom: 4 
		    };
	
	
				$scope.cardViewClick =  function() {
					$timeout(function() {
						$scope.cardView = true;
					}, 500);
			      $scope.listView = false;
			      $scope.mapView = false;
				};
				$scope.listViewClick =  function() {
			      $scope.cardView = false;
			      $scope.mapView = false;
			    $timeout(function() {
						$scope.listView = true;		
					}, 500);
			    };

			  $scope.mapViewClick = function(){
			      $scope.cardView = false;
			      $scope.listView = false;
			    $timeout(function(){
			      $scope.mapView = true;
			    },500);

			  } ;  

			  $scope.viewby = 10;
    
    $scope.currentPage = 4;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1;
		}
		 }
);

customer.controller("single_customer", 
	 function($scope, $http, $routeParams)
		{    
			$http.get('http://localhost:4000/customer/:id').then (function(data){
				$scope.whichCustomer = $routeParams.id;
				$scope.customer = data;
				
				console.log($scope.customer[$scope.whichCustomer])

			}).catch(function(err){
					console.log(err);
			}); 

			// $http.get('js/data.json').success (function(data){
			// 	$scope.customer = data;

			// 	$scope.whichCustomer = $routeParams.id;
			// 	console.log($scope.customer[$scope.whichCustomer].orders)

				 
			// });

		}
);

// customer.controller("order", 
// 	 function($scope, $http, $routeParams)
// 		{    
			// $http.get('http://localhost:4000/customer/order_list/:id').success (function(data){
			// 	$scope.whichCustomer = $routeParams.id;
			// 	$scope.customer = data;
				
			// 	console.log($scope.customer[$scope.whichCustomer])

			// }); 

			// $http.get('js/data.json').success (function(data){
			// 	$scope.customer = data;
			// 	$scope.whichCustomer = $routeParams.id;
				
			// 	$scope.total = $scope.customer[$scope.whichCustomer].orders;


			// 	$scope.sum = $scope.total.reduce(function(prevVal, elem) {
			// 		return prevVal + (elem.price*elem.quantity);
			// }, 0);

			// console.log($scope.sum);

				 
			// });

// 		}
// );

// customer.controller("new_info", 
// 	 function($scope, $http, $routeParams)
// 		{    
// 			$scope.register = function () {
//         var user = {
//             name: $scope.name,
// 						state: $scope.state,
// 						city:$scope.city,
// 						gender:$scope.gender
//         }

//         $http.post('http://localhost:4000/new_info', user).then(function (user, status) {
//             //alert(JSON.stringify(data))
//             console.log(user)
//             }
//         ).catch(function (user, status) {
//             alert("Connection Error");
//         });
//     };

// 			// $http.post('http://localhost:4000/new_info').success (function(data){
// 			// 	$scope.customer = data;
// 			// 	$scope.whichCustomer = $routeParams.id;
				
// 			// 	$scope.total = $scope.customer[$scope.whichCustomer].orders;


// 			// 	$scope.sum = $scope.total.reduce(function(prevVal, elem) {
// 			// 		return prevVal + (elem.price*elem.quantity);
// 			// }, 0);

// 			// console.log($scope.sum);

				 
// 			// });

// 		}
// );