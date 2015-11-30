app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        scope: {output:'='},
         link: function (scope, element, attrs) {
            element.datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {
                    scope.output = date;
                    console.log(scope.output)
                    scope.$apply();
                }
            });
        }
    };
});