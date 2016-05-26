app.controller('nominationController', function ($scope, httpService, localStorageService, $q, $rootScope, $location, dataService, networkService) {

    $scope.getCertificationListPerSkills = getCertificationListPerSkills;
    init();
    
    function init() {
        //model for view
        $scope.request = {};
        $scope.request.amount = 0;
        // variable to pass the data from dashboard to this
        var selectedItem = localStorageService.get('selectedCertificationItem');
        // Gets the list of certification from tables/Db based
        httpService.getCertificationCategories().then(function (response) {
            if (response.data != null) {
                $scope.certificationCategoryList = response.data;
                console.log($scope.certificationCategoryList);
            }
            if (!$rootScope.isEditCertificate && selectedItem) {
                console.log(selectedItem);
                var deferred = $q.defer();
                $scope.request.certificationCategory = selectedItem.CertificationCategoryId;
                getCertificationListPerSkills(deferred);
                $scope.request.RequestForCertificationId = selectedItem.CertificationId;
                deferred.resolve(true);
                return deferred.promise;
            }
        });

        if ($rootScope.isEditCertificate) {
            //$scope.request ={};

            $scope.request.certificationCategory = null;
            $scope.request.RequestForCertificationId = null;

            $scope.requestToEdit = dataService.getCertiData();
            console.log($scope.requestToEdit);
            $scope.request = $scope.requestToEdit;
            
            ($scope.request.quarter = new Date($scope.requestToEdit.quarter));

            $scope.request.remarks = $scope.requestToEdit.Remarks;
            $scope.request.IRA = $scope.requestToEdit.IRA;
            $scope.request.CertificationCategoryTitle = $scope.requestToEdit.CertificationCategoryTitle;

            var deferred = $q.defer();
            $scope.request.certificationCategory = $scope.requestToEdit.CertificationCategory;
            getCertificationListPerSkills(deferred);

            $scope.request.RequestForCertificationId = $scope.requestToEdit.RequestForCertificationId;
            deferred.resolve(true);
            return deferred.promise;

            console.log($scope.request.RequestForCertificationId);
        }

    }
    $scope.onCancel = function () {
        $scope.request = null;
        $scope.successMsg = null;
        $scope.message = null;
        $scope.nominationForm.$submitted = false;
    }

    $scope.addOrUpdate = function () {
        if ($scope.isEditCertificate) {
            $scope.updateCertification();
        } else {
            $scope.onNominate();
        }
    }
    $scope.onNominate = function () {
        if ($scope.nominationForm.$valid) {
            console.log($scope.request);
            $scope.request.RequestByUserId = localStorageService.get('userId');
            httpService.nominate($scope.request).then(function (response) {
                console.log(response);
                $scope.successMsg = "Nomination has been done successfully."
                $scope.message = null;
                $scope.request = null;
                $scope.nominationForm.$submitted = false;
            });
        } else {
            $scope.message = "Please enter required details."
        }
    }

    $scope.updateCertification = function () {
        console.log($scope.request);
        $scope.request.RequestByUserId = localStorageService.get('userId');
        if ($scope.nominationForm.$valid) {
            networkService.updateCertDetails($scope.request.RequestId, $scope.request).then(function (response) {
                console.log(response);
                if (response.data === 'success') {
                    $scope.successMsg = "Nomination has been updated successfully."
                    $scope.message = null;
                    $scope.request = null;
                } else if (response.data === 'error') {
                    $scope.message = "server responded with some error."
                    $scope.successMsg = null;
                    //$scope.request = null;
                } else {
                    $scope.message = "unable to process right now"
                    $scope.successMsg = null;
                    $scope.request = null;
                }
                $scope.nominationForm.$submitted = false;
            })
        } else {
            $scope.message = "Please enter required details."
        }
    }

    function getCertificationListPerSkills(deferred) {
        httpService.getCertificationListPerSkills($scope.request.certificationCategory).then(function (response) {
            if (response.data != null) {
                $scope.certificationList = response.data;
                deferred.resolve(true);
            }
        });
    }
    $rootScope.$on("requestThroughNavigation", function () {
        $rootScope.isEditCertificate = false;
        localStorageService.remove('selectedCertificationItem');
        $scope.successMsg = null;
        $scope.message = null;
        $scope.nominationForm.$submitted = false;
        init();
    });

    $scope.months = [];

});