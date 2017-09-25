/*globals angular, document, JST, window */

angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
angular.module('app.controllers', []);

var app = angular.module('app', ['app.services', 'app.directives', 'app.filters', 'app.controllers'], ['$httpProvider',
  function ($httpProvider) {
    'use strict';

    var csrf_token = document.getElementsByName('csrf-token')[0].content;
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrf_token;
    $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrf_token;
    $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrf_token;
  }]);

angular.element(document).ready(function () {
  'use strict';
  angular.bootstrap(document, ['app']);
});

app.config(['$compileProvider', function ($compileProvider) {
  'use strict';
  $compileProvider.debugInfoEnabled(false);
}]);


angular.module('app').run(function () {
  'use strict';
});



app.controller('employees', ['$scope', '$http', '$window', function ($scope, $http, $window) {

  $scope.getEmployees = function () {
    $http.get('/employees', {}).then(function (result) {
      console.log('employeesList',result.data.all)
      // console.log(result.data.count)

      $scope.employeesList = result.data.all
      $scope.employeeCount = result.data.count
    })
  }();

  $scope.getDietaries = function () {
    $http.get('/dietaries', {}).then(function (result) {
      console.log('dietariesList',result.data.all)
      console.log('Dcount',result.data.count)

      $scope.dietariesList = result.data.all
      $scope.dietariesCount = result.data.count
    })
  }();

  angular.element($window).bind('resize', function () {
    $scope.width = $window.innerWidth;

    $scope.$digest();

    $scope.leftIndex = 0
    if (Math.floor($scope.width) <= 1300) {
      $scope.rightIndex = 10
      // console.log('rightIndex', $scope.rightIndex)
    }
    else {
      if (Math.floor($scope.width) > 1300 && Math.floor($scope.width) < 1450) {
        $scope.rightIndex = 11
        // console.log('rightIndex', $scope.rightIndex)
      }
      else {
        if (Math.floor($scope.width) > 1450 && Math.floor($scope.width) < 1600) {
          $scope.rightIndex = 12
          // console.log('rightIndex', $scope.rightIndex)
        }
        else {
          if (Math.floor($scope.width) > 1600 && Math.floor($scope.width) < 2000) {
            $scope.rightIndex = 13
            // console.log('rightIndex', $scope.rightIndex)
          }
        }
      }
    }
  });

  $scope.leftIndex = 0
  $scope.rightIndex = 11
  $scope.changeIndexR = function () {
    if ($scope.rightIndex < $scope.employeeCount) {
      $scope.leftIndex++
      $scope.rightIndex++
      return true
    }
    else {
      return false
    }
  }

  $scope.changeIndexL = function () {
    if ($scope.leftIndex > 0) {
      $scope.leftIndex--
      $scope.rightIndex--
      return true
    }
    else {
      return false
    }
  }

  $scope.showEmployees = function (index) {
    if (index >= $scope.leftIndex && index < $scope.rightIndex)
      return true
  }

  $scope.selectedEmployee = function (index) {
    // console.log('index', index)
    $scope.indexSelected = index
  }

  $scope.indexSelected = 0
  $scope.changeColor = function (index) {
    if (index == $scope.indexSelected) {
      return true
    }
    else {
      return false
    }
  }

  $scope.employeeNameLength = function (index) {
    $scope.nameLength = $scope.employeesList[index].first_name.length + $scope.employeesList[index].last_name.length
    if ($scope.nameLength >= 15) {
      return false
    }
    return true
  }

  $scope.activEmployee = function (index){
    $scope.status = $scope.employeesList[index].status
    if ($scope.status == "active") {
      return true
    }
    return false
  }

  $scope.showEmployeeDietary = function (index){
    $scope.employeedietariesList =""
    for (var i=0; i < $scope.dietariesCount; i++){
      if ($scope.dietariesList[i].employee_id == $scope.employeesList[index].id )
        {
          $scope.employeedietariesList += $scope.dietariesList[i].dietary_type+ ' '
        }
    }
    return true
  }

}]);