app.controller('editEmployeeController',['networkService','$scope', '$modal', function(networkService , $scope , $modal){
   
    
}]);

/*app.controller('approvalController', function (httpService, $scope, $modal) {
    $scope.showDetails = false;
    httpService.getApprovalList().then(function (response) {
        if(response.data != null)
         $scope.approvalList = response.data;
    });

    $scope.openPopUp = function(index)
    {
        var modalInstance = $modal.open({
            backdrop: true,
            backdropClick: true,
            dialogFade: false,
            keyboard: true,
            templateUrl: 'views/certApprovalDetailscontroller.html',
            controller: 'certApprovalDetailsController',
            resolve: {
                modalData: function () {
                    return {
                        requestItem : $scope.approvalList[index]
                    }
                }
            }
        });

        modalInstance.result.then(function (data) {
            console.log(data);
        });
    }
   
});*/