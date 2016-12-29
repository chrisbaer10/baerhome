angular.module('admin-temperatures', [
  'resources.temperatures',
  'resources.users',
  'services.crud',
  'security.authorization'
])

.config(['crudRouteProvider', 'securityAuthorizationProvider', function (crudRouteProvider, securityAuthorizationProvider) {

  var getAllUsers = ['Temperatures', 'Users', '$route', function(Temperatures, Users, $route){
    return Users.all();
  }];

  crudRouteProvider.routesFor('Temperatures', 'admin')
    .whenList({
      temperatures: ['Temperatures', function(Temperatures) { return Temperatures.all(); }],
      adminUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenNew({
      temperature: ['Temperatures', function(Temperatures) { return new Temperatures(); }],
      users: getAllUsers,
      adminUser: securityAuthorizationProvider.requireAdminUser
    })
    .whenEdit({
      temperature: ['Temperatures', 'Users', '$route', function(Temperatures, Users, $route) { return Temperatures.getById($route.current.params.itemId); }],
      users: getAllUsers,
      adminUser: securityAuthorizationProvider.requireAdminUser
    });
}])

.controller('TemperaturesListCtrl', ['$scope', 'crudListMethods', 'temperatures', 'i18nNotifications', 'security', function($scope, crudListMethods, temperatures, i18nNotifications, security) {
  $scope.temperatures = temperatures;


  $scope.isAdmin = security.isAdmin;
  $scope.remove = function(temperature, $index, $event) {
    // Don't let the click bubble up to the ng-click on the enclosing div, which will try to trigger
    // an edit of this item.
    $event.stopPropagation();

    // Remove this user
    temperature.$remove(function() {
      // It is gone from the DB so we can remove it from the local list too
      $scope.temperatures.splice($index,1);
      i18nNotifications.pushForCurrentRoute('crud.temperature.remove.success', 'success', {id : temperature.$id()});
    }, function() {
      i18nNotifications.pushForCurrentRoute('crud.temperature.remove.error', 'error', {id : temperature.$id()});
    });
  };


  angular.extend($scope, crudListMethods('/admin/temperatures'));
}])

.controller('TemperaturesEditCtrl', ['$scope', '$location', 'i18nNotifications', 'users', 'temperature', function($scope, $location, i18nNotifications, users, temperature) {

  $scope.temperature = temperature;
  $scope.users = users;

  $scope.onSave = function(temperature) {
    i18nNotifications.pushForNextRoute('crud.temperature.save.success', 'success', {id : temperature.$id()});
    $location.path('/admin/temperatures');
  };

  $scope.onError = function() {
    i18nNotifications.pushForCurrentRoute('crud.temperature.save.error', 'error');
  };

}])

