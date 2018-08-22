var app = angular.module('order', ['ui.bootstrap']);

app.factory('Customers',function(){

    var Customers = [
        {
          name: "Fred Flintstone",
          city: "Bedrock",
          state: "Washingstone",
          gender: "Male",
          orderCount : 4
        },
        {
          name: "John Smith",
          city: "Norfolk",
          state: "Virginia",
          gender: "Male",
          orderCount : 6
        },
        {
          name: "Frank Livingston",
          city: "Pittsburgh",
          state: "Pennsylvania",
          gender: "Male",
          orderCount : 1
        },
        {
          name: "Judy Green",
          city: "Cincinatti",
          state: "Ohio",
          gender: "Female",
          orderCount : 7
        },
        {
          name: "Pat Thomas",
          city: "New York",
          state: "New York",
          gender: "Male",
          orderCount : 9
        },
        {
          name: "Betty Rubble",
          city: "Bedrock",
          state: "Washingstone",
          gender: "Female",
          orderCount : 3
        },
        {
          name: "Martha Smith",
          city: "Norfolk",
          state: "Virginia",
          gender: "Female",
          orderCount : 10
        },
        {
          name: "Liz Livingston",
          city: "Pittsburgh",
          state: "Pennsylvania",
          gender: "Female",
          orderCount : 8
        },
        {
          name: "Howard McGovern",
          city: "Denver",
          state: "Colorado",
          gender: "Male",
          orderCount : 5
        }
    ];
    
   return Customers ;
   
});



app.controller('customer', ['$scope','$timeout','Customers' , function($scope,$timeout,Customers,$watch){
    
    $scope.customers = Customers;

    console.log($scope.customers.length)
    

    $scope.cardView = true;
	$scope.listView = false;
	
	
	
	
	$scope.cardViewClick =  function() {
		$timeout(function() {
			$scope.cardView = true;
		}, 500);
			$scope.listView = false;
	};
	$scope.listViewClick =  function() {
			$scope.cardView = false;
    $timeout(function() {
			$scope.listView = true;		
		}, 500);
    };

    $scope.viewby = 10;
    $scope.totalItems = $scope.customers.length;
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
   
}]
);

