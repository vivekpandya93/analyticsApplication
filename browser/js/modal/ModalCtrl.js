app.controller('ModalCtrl',  function ($scope, $uibModal, $log) {

  $scope.items = ['Any', 'Apparel', 'Accessories', 'Sports'];

  $scope.gender = ['All', 'Male', 'Female', 'Unisex']

  // $scope.selectedGender = $scope.selected.gendi; 

  // $scope.selectedCategory = $scope.selected.item; 

  $scope.animationsEnabled = true;
 
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }, 
        gender: function() {
          return $scope.gender;
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

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, gender) {
  $scope.gender = gender; 
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0],
    gendi: $scope.gender[0],
  };
  $scope.isSelected = false; 
  $scope.ok = function () {
    localStorage.setItem('gender' , $scope.selected.gendi)
    localStorage.setItem('category', $scope.selected.item)
    $uibModalInstance.close($scope.selected.item);
    $uibModalInstance.close($scope.selected.gendi);
  };

  $scope.cancel = function () {
  	console.log('this also works')

    $uibModalInstance.dismiss('cancel');
  };
});