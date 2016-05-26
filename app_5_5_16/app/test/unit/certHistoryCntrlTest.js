describe("certificationHistoryController", function() {
    var $scope;
    var controller;

    beforeEach(function() {

        angular.module("myApp");

        inject(function(_$rootScope_, $controller) {

            $scope = _$rootScope_.$new();
            controller = $controller("certificationHistoryController", {$scope: $scope});

        });

    });

    it("Should say hello", function() {
        expect(controller.greeting).toEqual("Hello");
    });

});