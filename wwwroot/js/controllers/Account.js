﻿function AccountCtrl($window, $sessionStorage, $localStorage, $scope, getLookups, loginUser, logoutUser, registerUser, getUser) {
    $scope.$sessionStorage = $sessionStorage.$default(/* any defaults here */);
    $scope.$localStorage = $localStorage.$default(/* any defaults here */);

    getUser.get().$promise.then(function (response) {
        $sessionStorage.User = JSON.parse(JSON.stringify(response));
    }, function (error) {
        $sessionStorage.User === undefined
        $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
        //alert("Error " + $sessionStorage.iComsErr.status + " getting current User : " + $sessionStorage.iComsErr.data);
    });


    $scope.login = function (username, password) {
        // If we already have a bearer token, set the Authorization header - to check
        loginUser.get({
            username: username,
            password: password
        }).$promise.then(function (response) {
            $sessionStorage.User = JSON.parse(JSON.stringify(response));
            $sessionStorage.User.name = username;
            $window.history.back();
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Logging in : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.logout = function () {
        logoutUser.get().$promise.then(function (response) {
            $sessionStorage.User = undefined;
            //$window.history.back();
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Logging out : " + $sessionStorage.iComsErr.data);
        });
    };

    $scope.register = function (email, password) {
        // If we already have a bearer token, set the Authorization header - to check
        registerUser.get({
            username: email,
            email: email,
            password: password
        }).$promise.then(function (response) {
            $sessionStorage.User = JSON.parse(JSON.stringify(response));
            $scope.errors = [];
            if (response.result.succeeded === true) {
                $scope.login(email, password);
            }
            else {
                //var errorMsg = "Error Logging in : ";
                $scope.errors = response.result.errors;
                //response.result.errors.forEach(function (error) {
                //    errorMsg += error.code + ' - ' + error.description + '.......';
                //})
                //alert(errorMsg);
            }
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " registering username : " + $sessionStorage.iComsErr.data);
        });
    };


    $scope.fillLookups = () => {
        getLookups.get().$promise.then(function (response) {
            var Lookups = JSON.parse(JSON.stringify(response));
            $localStorage.lookups = Lookups;
            $(function () {
                $('.selectpicker').selectpicker();
            });
        }, function (error) {
            alert("Error retrieving lookups : " + error);
        });
    };

    if ($localStorage.lookups === undefined) {
        $scope.fillLookups();
    }
    /*
     * countries - Used as duallistbox in form advanced view
     */
}
angular
    .module('inspinia')
    .controller('AccountCtrl', AccountCtrl);