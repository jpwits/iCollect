
function AccountCtrl($http, $state, $scope, passData, loginUser) {
    $scope.login = function (username, password) {
        // If we already have a bearer token, set the Authorization header.
        loginUser.get({
            username: username,
            password: password
        }).$promise.then(function (response) {
            var check = response;
            $scope.User = JSON.parse(JSON.stringify(response));
            $scope.User.name = username;
            passData.set("User", $scope.User);
            $state.go("app.setsng({ album : null, viewLayout : 'Tiles' })");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };
/*
 * countries - Used as duallistbox in form advanced view
 */
}
angular
    .module('inspinia')
    .controller('AccountCtrl', AccountCtrl);