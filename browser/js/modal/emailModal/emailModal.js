app.directive('email', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/modal/emailModal/emailModal.html',
 				controller: 'emailModalCtrl'
    };
});
