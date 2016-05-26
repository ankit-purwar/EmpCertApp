app.controller('certHistoryPopupController', function ($scope, $modalInstance, modalData, networkService, $location, localStorageService, dataService, $rootScope) {

    init();

    function init() {
        $scope.request = {};
        $scope.request = modalData.requestItem;
        console.log($scope.request);
    }

    if ($scope.request.Status === 'Pending') {
        $scope.canEdit = true;

    } else {
        $scope.canEdit = false;
    }

    if ($scope.canEdit) {
        $scope.infoMessage = 'Do you want to edit this certification request.'
    } else {
        $scope.infoMessage = 'Sorry only pending request could be edited.'
    }

    $scope.closePopUp = function () {
        $modalInstance.close();
    }
    $scope.onCancel = function () {
        $scope.request = {};
        $modalInstance.close();
    }
    $scope.editCertificateDetails = function ( /*$index*/ ) {
        /*   var selectedItem = $scope.request;
           var selectedItemId = $scope.request.RequestForCertificationId;
           localStorageService.set('selectedCertToUpdateId', selectedItem);*/
        //  localStorageService.set('selectedCertificationItem', selectedItem);
        dataService.setCertiData($scope.request);
        //console.log($scope.request);
        $rootScope.isEditCertificate = true;
        $location.path('/updateCertification');
    }

    $scope.onSubmit = function () {
        $scope.CertificationDetailsForm.$setSubmitted(true);
        if ($scope.CertificationDetailsForm.$valid) {
            /* httpService.updateCertificationStatus($scope.request.RequestId, $scope.request).then(function (response) {
                 if (response.data == "success") {
                     $modalInstance.close({
                         data: $scope.request.Status
                     });

                 }
             });*/
            $scope.editCertificateDetails();
            $modalInstance.close({
                //data: $scope.request.Status
            });
          /*  console.log($scope.request.Status);
            $scope.message = "functionality yet to implement.";
*/
        } else {
            $scope.message = "Please enter required fields.";
        }
    }

});