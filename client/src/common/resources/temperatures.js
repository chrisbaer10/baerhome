angular.module('resources.temperatures', ['mongolabResource']);
angular.module('resources.temperatures').factory('Temperatures', ['mongolabResource', function (mongoResource) {

  var tempResource = mongoResource('temperatures');
  // userResource.prototype.getFullName = function () {
  //   return this.lastName + " " + this.firstName + " (" + this.email + ")";
  // };
  return tempResource;
}]);
