function AccountCtrl($window, $sessionStorage, $localStorage, $scope, $state, getSetsSrvNg, loginUser, logoutUser, registerUser, getRoles, getCatalogTypesSrv,authUser) {
    $scope.$sessionStorage = $sessionStorage.$default(/* any defaults here */);
    $scope.$localStorage = $localStorage.$default(/* any defaults here */);

    $scope.ifAdmin = function () {
        if ($sessionStorage.User === undefined)
            return false;

        if ($sessionStorage.User.roles.includes('Admin')) {
            return true;
        } else {
            return false;
        }
    }
    //$scope.currentUser = function () {
    //    getUser.get().$promise.then(function (response) {
    //        $sessionStorage.User = JSON.parse(JSON.stringify(response));
    //        if ($sessionStorage.User.name === null) { $sessionStorage.User = undefined }
    //    }, function (error) {
    //        $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
    //        //alert("Error " + $sessionStorage.iComsErr.status + " getting current User : " + $sessionStorage.iComsErr.data);
    //    });
    //}

    //$scope.login2 = function (username, password) {
    //    // If we already have a bearer token, set the Authorization header - to check
    //    loginUser.get({
    //        username: username,
    //        password: password
    //    }).$promise.then(function (response) {
    //        $sessionStorage.User = JSON.parse(JSON.stringify(response));
    //        $sessionStorage.User.name = username;
    //        $window.history.back();
    //    }, function (error) {
    //        $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
    //        alert("Error " + $sessionStorage.iComsErr.status + " Logging in : " + $sessionStorage.iComsErr.data);
    //    });
    //};

    $scope.login = function (username, password) {
        $scope.entry = new authUser();
        $scope.entry.username = username;
        $scope.entry.password = password;
        $scope.entry.$save(function (response) {
            $sessionStorage.User = JSON.parse(JSON.stringify(response));
            $sessionStorage.User.name = username;
            if ($localStorage.lookups === undefined) {
                $scope.fillLookups();
            }

            getRoles.get({
                username: username
            }).$promise.then(function (response) {
                $sessionStorage.User.roles = JSON.parse(JSON.stringify(response)).roles;
                $window.history.back();
            }, function (error) {
                $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status + " Getting Roles : " + $sessionStorage.iComsErr.data);
            });
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
                alert("Error " + $sessionStorage.iComsErr.status + " Logging in : " + $sessionStorage.iComsErr.data);
        });
    }

    $scope.logout = function () {
        logoutUser.get().$promise.then(function (response) {
            $sessionStorage.User = undefined;
            //$window.history.back();
            $state.go('dashboards.dashboard_1');
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
                alert("Error " + $sessionStorage.iComsErr.status + " registering username : " + $sessionStorage.iComsErr.status + " : " +  $sessionStorage.iComsErr.data);
        });
    };


    $scope.fillLookups = () => {
        getSetsSrvNg.lookups($sessionStorage.User.token).get().$promise.then(function (response) {
            var Lookups = JSON.parse(JSON.stringify(response));
            $localStorage.lookups = Lookups;
            $(function () {
                $('.selectpicker').selectpicker();
            });
        }, function (error) {
            alert("Error retrieving lookups : " + error);
        });
    };

    $scope.getCatalogTypes = () => {
        getCatalogTypesSrv.get().$promise.then(function (response) {
            var jsonResp = JSON.parse(JSON.stringify(response.data));
            $sessionStorage.catTypes = jsonResp;
        }, function (error) {
            $sessionStorage.iComsErr = JSON.parse(JSON.stringify(error));
            alert("Error " + $sessionStorage.iComsErr.status + " Retrieving Catalog Types : " + $sessionStorage.iComsErr.data);
        });
    };

    if ($sessionStorage.catTypes === undefined) {
        $scope.getCatalogTypes();
    }

    //$scope.getCatalogs();
    /*
     * countries - Used as duallistbox in form advanced view
     */
}
angular
    .module('inspinia')
    .controller('AccountCtrl', AccountCtrl);