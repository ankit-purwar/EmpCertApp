app.controller('myProfileController', ['$scope', '$location', 'networkService', 'localStorageService', '$rootScope', function ($scope, $location, networkService, localStorageService, $rootScope) {

    init();

    function init() {

        var empId = localStorageService.get('EmployeeId');
        getEmployeeDetailsData(empId);
        getDesignationData();
        getTechnologyData();
    }

    $scope.Photo = '';

    function getEmployeeDetailsData(empId) {
        networkService.getEmpDetails(empId).then(function (data) {
            console.log(data);
            $scope.empMaster = data.data;
            $scope.Photo = $scope.empMaster.ProfilePhoto;
            $scope.image = new Image();

            $scope.image = new Image();
            if ($scope.Photo == null || $scope.Photo == '' || $scope.Photo == undefined) {
                //$scope.image2.resized.dataURL = 'css/images/profile.png';
                document.getElementById("profilePhoto").src = 'css/images/profile.png';
                if ($scope.image.src) {
                    $scope.imageIndicator = true;
                    $scope.image2 = true;
                }
            } else {
                $scope.image.src = 'data:image/png;base64,' + $scope.Photo;
                document.getElementById("profilePhoto").src = $scope.image.src;
                if ($scope.image.src) {
                    $scope.imageIndicator = true;
                }
            }

        });
    }

    function getDesignationData() {
        networkService.getDesignation().then(function (data) {
            console.log(data);
            $scope.designationOptions = data.data;
        });
    }

    function getTechnologyData() {
        networkService.getTechnology().then(function (data) {
            console.log(data);
            $scope.technologyOption = data.data;
        });
    };

    var getDatauriSize = function (file) {
        var base64 = file.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        return base64;
    }

    var imageByteArray = function () {
        var normalByteArray = [];
        var base64 = document.getElementById("profilePhoto").src;
        if (base64 == undefined || base64 == null || base64.length == 0 || base64.substr(base64.length - 5) === "/null") {
            return null;
        } else {
            var byteCharacters = atob(getDatauriSize(base64));
            var byteNumbers = new Array(byteCharacters.length);

            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);

            for (var j = 0; j < byteArray.length; j++) {
                normalByteArray.push(byteArray[j]);
            }
            if (normalByteArray.length === 0 || normalByteArray === undefined) {
                return null;
            } else {
                return normalByteArray;
            }
        }
    }

    $scope.sendDetails = function () {

        if ($scope.MyProfileForm.$valid) {
            /* if ($scope.empMaster.ProfilePhoto) {
                 $scope.empMaster.ProfilePhoto = null; 
             } else {*/
            $scope.empMaster.ProfilePhoto = imageByteArray();
            $scope.empMaster.LastModifiedbyUserId = 2;
            $scope.empMaster.CreatedByUserId = 2;
            console.log($scope.empMaster);
            //}


            networkService.updateEmpDetails(localStorageService.get('EmployeeId'), $scope.empMaster).then(function (data) {
                if (data.data === 'success' && data.status === 200) {
                    $scope.successmessage = "Employee details updated sucessfully.";
                    //$location.path('/employee');
                } else if (data.data === 'error') {
                    $scope.message = "unable to process update request.";
                    $scope.successmessage = null;
                }
            });


        } else {
            $scope.message = "Please enter required fields. ";
            $scope.successmessage = null;
        }
    }

    $scope.clearImage = function () {
        document.getElementById("profilePhoto").src = null;
        document.getElementById("inputImage2").value = '';
        $scope.imageIndicator = false;
        $scope.image2 = false;
    }

    $scope.cancel = function () {
        $location.path('/dashBoard');
    }

    $rootScope.$on("requestThroughNavigation", function () {
        // localStorageService.remove('selectedCertificationItem');
        $scope.successmessage = null;
        $scope.message = null;
        $scope.MyProfileForm.$submitted = false;
        init();
    });


}]);