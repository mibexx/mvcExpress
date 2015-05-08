app.controller('bodyController', ['$scope', '$http', function($scope, $http) {

    $scope.refreshTime = function() {
        $http.get('/api/time/time')
            .success(function(data, status) {
                if (status == 200) {
                    $scope.time = data.time;
                    setTimeout(function() {
                        $scope.refreshTime();
                    }, 1000);
                }
            }
        );
    }

    $scope.refreshTime();



}]);