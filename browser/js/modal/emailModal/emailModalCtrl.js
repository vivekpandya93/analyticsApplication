app.controller('emailModalCtrl',  function ($scope, $uibModal, $log, $window) {
  
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    $scope.query = $window.location.href
    console.log("$scope", $scope.query)
    $scope.email = {}
    $scope.email.message = $scope.query
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myEmailModalContent.html',
      controller: 'emailModalInstanceCtrl',
      size: size,
      resolve: {
        email: function(){
          return $scope.email; 
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

app.controller('emailModalInstanceCtrl', function ($scope, $uibModalInstance, email, homeFactory, $location) {
  $scope.query = $location.search();
  $scope.email = email;
  $scope.selected = {
    emailInfo: $scope.email
  };
  $scope.isSelected = false; 
  $scope.ok = function () {
    console.log("email:", $scope.selected.emailInfo)
    homeFactory.sendEmailInfo($scope.selected.emailInfo)
    $uibModalInstance.close($scope.selected.emailInfo);
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});