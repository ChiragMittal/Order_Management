

var customer = angular.module("customer", []);

customer.controller("customer",
	function($scope, $http,$timeout)
		{    
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
			$http.get('http://localhost:4000/customer/1').success (function(data){
				$scope.whichCustomer = $routeParams.id;
				console.log($scope.whichCustomer)
				//$scope.whichCustomer = $routeParams.id;
				$scope.customer = data;
				
				console.log($scope.customer[$scope.whichCustomer])

			}); 
		}
);