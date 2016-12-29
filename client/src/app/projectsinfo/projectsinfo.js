angular.module('home', [], ['$routeProvider', function($routeProvider){

  $routeProvider.when('/home', {
    templateUrl:'projectsinfo/list.tpl.html',
    controller:'HomeListCtrl',
    controllerAs: 'home',
    resolve:{
      temperatures:['Temperatures', function(Temperatures){
        return Temperatures.all();
      }]
    }
  });
}]);

angular.module('home').controller('HomeListCtrl', ['$scope', 'temperatures', function($scope, temperatures){
  var home = this;
  home.temperatures = temperatures;

  home.labels = ["January", "February", "March", "April", "May", "June", "July"];
  home.series = ['Series A', 'Series B'];
  home.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  home.onClick = function (points, evt) {
    console.log(points, evt);
  };
  home.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  home.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
}]);