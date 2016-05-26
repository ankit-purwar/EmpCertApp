app.controller('certificationHistoryController', ['networkService', '$scope', '$modal', '$filter', 'localStorageService', function (networkService, $scope, $modal, $filter, localStorageService) {

  this.message = "Hello";

    var empId = localStorageService.get('EmployeeId');
    console.log(empId);
    //$scope.showDetails = false;

    networkService.getNominationHistory(26).then(function (response) {
        console.log(response);
        if (response.data != null)
            $scope.FilteredCertificationHistoryList = response.data;
    });

    //$scope.FilteredCertificationHistoryList = [],
    /* $scope.currentPage = 1;
    $scope.numPerPage = 4;
    $scope.maxSize = 5;

    $scope.numPages = function () {
        return Math.ceil($scope.CertificationHistoryList.length / $scope.numPerPage);
    };

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.FilteredCertificationHistoryList = $scope.CertificationHistoryList.slice(begin, end);
    });

*/

    $scope.openPopUp = function (index) {
        var modalInstance = $modal.open({
            backdrop: true
            , backdropClick: true
            , dialogFade: false
            , keyboard: true
            , templateUrl: 'views/certHistoryPopup.html'
            , controller: 'certHistoryPopupController'
            , modalData: 'hi there'
            , resolve: {
                modalData: function () {
                    return {
                        requestItem: $scope.FilteredCertificationHistoryList[index]
                    }
                }
            }
        });

        modalInstance.result.then(function (data) {
            console.log(data);
        });
    }

    var orderBy = $filter('orderBy');

    $scope.order = function (predicate) {
        $scope.predicate = predicate;
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.FilteredCertificationHistoryList = orderBy($scope.FilteredCertificationHistoryList, predicate, $scope.reverse);
        
        if ($scope.reverse)
            iconName = 'glyphicon glyphicon-chevron-up';
        else
            iconName = 'glyphicon glyphicon-chevron-down';
        
        
     /*   if (predicate === 'RequestId') {
            $scope.Header[0] = iconName;
        } else if (predicate === 'CertificationCategoryTitle') {
            $scope.Header[1] = iconName;
        }else if (predicate === 'certificationDetails') {
            $scope.Header[2] = iconName;
        } else if (predicate === 'Status') {
            $scope.Header[3] = iconName;
        } 
        else {
            $scope.Header[4] = iconName;
        }

        $scope.reverse = !$scope.reverse;*/

    };
    $scope.order('RequestId', true);


}]);