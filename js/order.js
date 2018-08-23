var app = angular.module('order', ['ui.bootstrap','uiGmapgoogle-maps']);

app.factory('Customers',function(){

    var Customers = [
        {
          id:0,
          name: "Fred Flintstone",
          city: "Bedrock",
          state: "Washingstone",
          gender: "Male",
          orderCount : 4,
          coords: {
            latitude: "45.5200",
            longitude: "-122.6819"
          },
          window: {
            title: "Portland, OR"
          }
        },
        {
          id:1,
          name: "John Smith",
          city: "Norfolk",
          state: "Virginia",
          gender: "Male",
          orderCount : 6
        },
        {
          id:2,
          name: "Frank Livingston",
          city: "Pittsburgh",
          state: "Pennsylvania",
          gender: "Male",
          orderCount : 1
        },
        {
          id:3,
          name: "Judy Green",
          city: "Cincinatti",
          state: "Ohio",
          gender: "Female",
          orderCount : 7
        },
        {
          id:4,
          name: "Pat Thomas",
          city: "New York",
          state: "New York",
          gender: "Male",
          orderCount : 9 ,
          coords: {
            latitude: "40.7903",
            longitude: "-73.9597"
          },
          window : {
            title: "Manhattan New York, NY"
          }
        },
        {
          id:5,
          name: "Betty Rubble",
          city: "Bedrock",
          state: "Washingstone",
          gender: "Female",
          orderCount : 3 ,
          coords: {
            latitude: "41.7903",
            longitude: "-73.9597"
          },
          window : {
            title: "Manhattan New York, NY"
          }
        },
        {
          id:6,
          name: "Martha Smith",
          city: "Norfolk",
          state: "Virginia",
          gender: "Female",
          orderCount : 10 ,
          coords: {
            latitude: "42.7903",
            longitude: "-73.9597"
          },
          window : {
            title: "Manhattan New York, NY"
          }
        },
        {
          id:7,
          name: "Liz Livingston",
          city: "Pittsburgh",
          state: "Pennsylvania",
          gender: "Female",
          orderCount : 8
        },
        {
          id:8,
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

    $scope.map = { 
      center: { latitude: 39.8282, longitude: -98.5795 }, 
      zoom: 4 
    };

    console.log($scope.customers)
    

    $scope.cardView = true;
    $scope.listView = false;
    $scope.mapView = false;
	
	
	
	
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

