/// <reference path="scripts/angular.js" />
var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap'])
    .config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html'
            , controller: 'loginController'
        }).
        when('/newUser', {
            templateUrl: 'views/new-user.html'
            , controller: 'newUserController'
        }).
        when('/dashBoard', {
            templateUrl: 'views/dashBoard.html'
            , controller: 'dashBoardController'
        }).
        when('/employee', {
            templateUrl: 'views/employeeMaster.html'
            , controller: 'employeeMasterController'
        }).
        when('/nomination', {
            templateUrl: 'views/nomination.html'
            , controller: 'nominationController'
        }).
        when('/approve', {
            templateUrl: 'views/approval.html'
            , controller: 'approvalController'
        }).
        when('/certificationMaster', {
            templateUrl: 'views/CertificationMaster.html'
            , controller: 'CertCtrl'
        }).
        when('/editEmployee', {
            /* templateUrl: 'views/employeeMaster.html'
             , controller: 'employeeMasterController'*/
            templateUrl: 'views/myProfile.html'
            , controller: 'myProfileController'
        }).
        when('/certificationHistory', {
            templateUrl: 'views/certificationHistory.html'
            , controller: 'certificationHistoryController'
        }).
        when('/updateCertification',{
            templateUrl:'views/nomination.html'
            , controller: 'nominationController'
        }).
        otherwise({
            redirectTo: '/login'
        });
                  }]);