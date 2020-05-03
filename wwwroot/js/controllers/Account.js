function AccountCtrl($window, $sessionStorage, $localStorage, $scope, getLookups,loginUser) {
    $scope.$sessionStorage = $sessionStorage.$default(/* any defaults here */);
    $scope.$localStorage = $localStorage.$default(/* any defaults here */);

    $scope.login = function (username, password) {
        // If we already have a bearer token, set the Authorization header.
        loginUser.get({
            username: username,
            password: password
        }).$promise.then(function (response) {
            $sessionStorage.User = JSON.parse(JSON.stringify(response));
            $sessionStorage.User.name = username;
            $window.history.back();
            //$state.go("app.setsng");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
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
            alert("Error getting orders from back-end : " + error);
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