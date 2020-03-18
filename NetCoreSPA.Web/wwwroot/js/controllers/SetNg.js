function SetsNgCtrl($scope, $state, updateImage, $compile, $templateCache, getSetSrv, getSetsSrvNg, passData, $timeout, $q) {
    $scope.session_pglen = passData.get("Session_PgLen");
    $scope.iColSets = passData.get("CurSet");   

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

    $scope.SelectItem = (event, index, setId, direction) => {
        getSetSrv.get({ id: setId }).$promise.then(function (response) {
            var curSet = JSON.parse(JSON.stringify(response));
            curSet.delItems = curSet.items.filter(item => item.isActive === false);
            curSet.items = curSet.items.sort(function (a, b) {
                return a.position - b.position;
            }).filter(item => item.isActive === true);

            $scope.User = passData.get("User");
            if ($scope.User.name === null) {
                alert('Login Id10t');
                return;
            }

            //iColSets

            curUserItems = curSet.items[index];
            if (curUserItems.userItems.length === 0) {
                curUserItems.userItems.push({ userId: $scope.User.name, itemId: curUserItems.itemId, quantity: 0 });
            }
            
            if (direction === true) {
                curUserItems.userItems[0].quantity++;  //0 here should be user find, do user filtering on api []->{}
                //event.currentTarget.previousSibling.innerText = curUserItems.userItems[0].quantity;
            }
            else {
                curUserItems.userItems[0].quantity--;
                //event.currentTarget.previousSibling.previousSibling.innerText = curUserItems.userItems[0].quantity;
            }

            // var clone = Object.assign({}, curSet);
            //clone.items = clone.items.concat(clone.delItems);
            $scope.entry = new updateImage(curSet);
            $scope.entry.$update(function (response) {

             //$compile(angular.element('#ng-grid'))($scope);

                //alert("Saved successfully...");
            }, function (error) {
                alert("Error getting orders from back-end : " + error);
            });
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