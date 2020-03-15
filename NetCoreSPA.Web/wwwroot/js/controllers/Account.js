
function AccountCtrl($http, $scope, passData, getUser) {
    this.login = function (data) {
        // If we already have a bearer token, set the Authorization header.
        var token = sessionStorage.getItem(tokenKey);
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        $.ajax({
            type: 'GET',
            url: 'api/values/1',
            headers: headers
        }).done(function (data) {
            self.result(data);
        }).fail(showError);
    };
    /*
 * countries - Used as duallistbox in form advanced view
 */
}
angular
    .module('inspinia')
    .controller('AccountCtrl', AccountCtrl);