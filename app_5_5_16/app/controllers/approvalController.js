app.controller('approvalController', function (httpService, $scope, $modal, $filter) {
    $scope.showDetails = false;
    httpService.getApprovalList().then(function (response) {
        if (response.data != null)
            $scope.approvalList = response.data;
    });

    $scope.openPopUp = function (index) {
        var modalInstance = $modal.open({
            backdrop: true
            , backdropClick: true
            , dialogFade: false
            , keyboard: true
            , templateUrl: 'views/certApprovalDetailscontroller.html'
            , controller: 'certApprovalDetailsController'
            , resolve: {
                modalData: function () {
                    return {
                        requestItem: $scope.approvalList[index]
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
        $scope.approvalList = orderBy($scope.approvalList, predicate, $scope.reverse);
    };
    $scope.order('RequestId', true);

   /* $scope.sortByTechnology = function () {
        $scope.approvalList = orderBy($scope.approvalList.CertificationCategoryTitle);
    }
*/
});