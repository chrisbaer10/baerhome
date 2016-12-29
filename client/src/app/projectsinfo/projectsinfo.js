angular.module('projectsinfo', [], ['$routeProvider', function($routeProvider){

  $routeProvider.when('/projectsinfo', {
    templateUrl:'projectsinfo/list.tpl.html',
    controller:'ProjectsInfoListCtrl',
    controllerAs: 'home',
    resolve:{
      temperatures:['Temperatures', function(Temperatures){
        return Temperatures.all();
      }]
    }
  });
}]);

angular.module('projectsinfo').controller('ProjectsInfoListCtrl', ['$scope', 'temperatures', function($scope, temperatures){
  var home = this;
  home.temperatures = temperatures;
}]);