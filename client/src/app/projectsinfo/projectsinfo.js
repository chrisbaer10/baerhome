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
  var timeFormat = "MM/DD/YYYY HH:mm:ss";

  function randomColorFactor() {
    return Math.round(Math.random() * 255);
  }

  function randomColor(opacity) {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
  }

  var config = {
    type: 'line',
    data: {
      datasets: [{
        label: 'something',
        backgroundColor: randomColor(0.5),
        borderColor: randomColor(0.4),
        pointBorderColor: randomColor(0.7),
        pointBackgroundColor: randomColor(0.5),
        pointBorderWidth: 1,
        data: [{
          x: moment().format(timeFormat),
          y: 98.6
        },
          {
            x: moment().add(5,'m').format(timeFormat),
            y: 100
          }],
        fill: false
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Temperature"
      },
      scales: {
        xAxes: [{
          type: "time",
          display: true,
          time: {
            suggestedMin: moment().subtract(1, 'm').format(timeFormat),
            suggestedMax: moment().add(1, 'm').format(timeFormat)
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Degrees (F)'
          }
        }]
      }
    }
  };

  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, config);

}]);