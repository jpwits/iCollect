function SetsNgCtrl($scope, $state, updateImage, $compile, $templateCache, getSetsSrvNg, passData, getSetSrv, $timeout, $q) {
    $scope.session_pglen = passData.get("Session_PgLen");
    $scope.iColSets = passData.get("$scope.iColSets");

    if ($scope.session_pglen === undefined) { $scope.session_pglen = 50; }
    if ($scope.iColSets === undefined) {
        getSetsSrvNg.get({ start: '0', length: '10' }).$promise.then(function (response) {
            $scope.iColSets = JSON.parse(JSON.stringify(response));
            angular.forEach($scope.iColSets.data, function (set) {
                if (set.items.length > 0) {
                    set.delItems = set.items.filter(img => img.isActive === false);
                    set.items = set.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(img => img.isActive === true);
                }
            });
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    }

    $scope.selectPart = (event) => {
        if (event.currentTarget.checked === true) {
            event.currentTarget.previousSibling.style.border = "2px solid green";
        }
        else {
            event.currentTarget.previousSibling.style.border = "2px solid grey";
        }
    };

    $scope.selectSet = (event, idx) => {
        $scope.iColSet = $scope.iColSets.data[idx];
        passData.set("$scope.iColSets", $scope.iColSets);
        getSetSrv.get({ id: $scope.iColSet.setId }).$promise.then(function (response) {
            $scope.iColSet = response;
            passData.set("CurSet", $scope.iColSet);
            passData.set("$scope.iSetSelected", $scope.iSetSelected = idx);
            $state.go('app.set');
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.SelectItem = (event, setidx, itemidx, direction) => {
        var items = $scope.iColSets.data[setidx].items;
        var item = items[itemidx];

        $scope.User = passData.get("User");
        if ($scope.User.name === null) {
            alert('Login Id10t');
            return;
        }

        if (itemidx === 0) {
            items.forEach(function (item) {
                if (item.userItems.length === 0) {
                    item.userItems.push({ userId: $scope.User.name, itemId: item.itemId, quantity: 0 });
                }
                item.userItems[0].quantity = item.userItems[0].quantity + direction;
            });
        } else {
            if (item.userItems.length === 0) {
                item.userItems.push({ userId: $scope.User.name, itemId: item.itemId, quantity: 0 });
            }
            item.userItems[0].quantity = item.userItems[0].quantity + direction;
        }  //0 here should be user find, do user filtering on api change entity []->{}

        $scope.entry = new updateImage($scope.iColSets.data[setidx]);
        $scope.entry.$update(function (response) {

        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });

        //var cboxes = document.getElementsByName('cb_' + setId);
        //cboxes.forEach(function (cbox) {
        //    cbox.checked = event.currentTarget.checked;
        //});

        //if (event.currentTarget.checked === true) {
        //    event.currentTarget.previousSibling.style.border = "2px solid lime";
        //}
        //else {
        //    event.currentTarget.previousSibling.style.border = "2px solid grey";
        //}

        //update db
    };

    $scope.createSet = function (id) {
        if (id === undefined) {
            var iCol = new getSetSrv();
            iCol.setImages = [];
            iCol.delImages = [];
            passData.set("Selected", iCol);
            $state.go('app.sets_edit', {});
        }
    };
}

angular
    .module('inspinia')
    .controller('SetsNgCtrl', SetsNgCtrl);