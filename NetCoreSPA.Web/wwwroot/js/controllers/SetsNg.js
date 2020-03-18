﻿function SetsNgCtrl($scope, $state, updateImage, DTOptionsBuilder, $compile, $templateCache, getSetsSrvNg, passData, getSetSrv, $timeout, $q) {
    $scope.session_pglen = passData.get("Session_PgLen");
    $scope.iColSets = passData.get("$scope.iColSets");
    if ($scope.session_pglen === undefined) { $scope.session_pglen = 50; }

    //$scope.currentPage = 0;
    //$scope.pageSize = $scope.session_pglen;
    //$scope.numberOfPages = function () {
    //    return Math.ceil($scope.data.length / $scope.session_pglen);
    //};
    
    if ($scope.iColSets === undefined) {
        getSetsSrvNg.get({ start: '0', length: '10' }).$promise.then(function (response) {
            $scope.iColSets = JSON.parse(JSON.stringify(response));
            angular.forEach($scope.iColSets.data, function (set) {
                if (set.items.length > 0) {
                    set.delItems = set.items.filter(item => item.isActive === false);
                    set.items = set.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(item => item.isActive === true);
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

    $scope.selectSet = (event, setidx) => {
        passData.set("$scope.iColSets", $scope.iColSets);
        var set = $scope.iColSets.data[setidx];
        getSetSrv.get({ id: set.setId }).$promise.then(function (response) {
            set = JSON.parse(JSON.stringify(response));
            if (set.items.length > 0) {
                set.delItems = set.items.filter(item => item.isActive === false);
                set.items = set.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            passData.set("CurSet", set);
            passData.set("$scope.iSetSelected", $scope.iSetSelected = setidx);
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

var PaginationDemoCtrl = function ($scope) {
    $scope.data = [{ "name": "Bell", "id": "K0H 2V5" }, { "name": "Octavius", "id": "X1E 6J0" }, { "name": "Alexis", "id": "N6E 1L6" }, { "name": "Colton", "id": "U4O 1H4" }, { "name": "Abdul", "id": "O9Z 2Q8" }, { "name": "Ian", "id": "Q7W 8M4" }, { "name": "Eden", "id": "H8X 5E0" }, { "name": "Britanney", "id": "I1Q 1O1" }, { "name": "Ulric", "id": "K5J 1T0" }, { "name": "Geraldine", "id": "O9K 2M3" }, { "name": "Hamilton", "id": "S1D 3O0" }, { "name": "Melissa", "id": "H9L 1B7" }, { "name": "Remedios", "id": "Z3C 8P4" }, { "name": "Ignacia", "id": "K3B 1Q4" }, { "name": "Jaime", "id": "V6O 7C9" }, { "name": "Savannah", "id": "L8B 8T1" }, { "name": "Declan", "id": "D5Q 3I9" }, { "name": "Skyler", "id": "I0O 4O8" }, { "name": "Lawrence", "id": "V4K 0L2" }, { "name": "Yael", "id": "R5E 9D9" }, { "name": "Herrod", "id": "V5W 6L3" }, { "name": "Lydia", "id": "G0E 2K3" }, { "name": "Tobias", "id": "N9P 2V5" }, { "name": "Wing", "id": "T5M 0E2" }, { "name": "Callum", "id": "L9P 3W5" }, { "name": "Tiger", "id": "R9A 4E4" }, { "name": "Summer", "id": "R4B 4Q4" }, { "name": "Beverly", "id": "M5E 4V4" }, { "name": "Xena", "id": "I8G 6O1" }, { "name": "Yael", "id": "L1K 5C3" }, { "name": "Stacey", "id": "A4G 1S4" }, { "name": "Marsden", "id": "T1J 5J3" }, { "name": "Uriah", "id": "S9S 8I7" }, { "name": "Kamal", "id": "Y8Z 6X0" }, { "name": "MacKensie", "id": "W2N 7P9" }, { "name": "Amelia", "id": "X7A 0U3" }, { "name": "Xavier", "id": "B8I 6C9" }, { "name": "Whitney", "id": "H4M 9U2" }, { "name": "Linus", "id": "E2W 7U1" }, { "name": "Aileen", "id": "C0C 3N2" }, { "name": "Keegan", "id": "V1O 6X2" }, { "name": "Leonard", "id": "O0L 4M4" }, { "name": "Honorato", "id": "F4M 8M6" }, { "name": "Zephr", "id": "I2E 1T9" }, { "name": "Karen", "id": "H8W 4I7" }, { "name": "Orlando", "id": "L8R 0U4" }, { "name": "India", "id": "N8M 8F4" }, { "name": "Luke", "id": "Q4Y 2Y8" }, { "name": "Sophia", "id": "O7F 3F9" }, { "name": "Faith", "id": "B8P 1U5" }, { "name": "Dara", "id": "J4A 0P3" }, { "name": "Caryn", "id": "D5M 8Y8" }, { "name": "Colton", "id": "A4Q 2U1" }, { "name": "Kelly", "id": "J2E 2L3" }, { "name": "Victor", "id": "H1V 8Y5" }, { "name": "Clementine", "id": "Q9R 4G8" }, { "name": "Dale", "id": "Q1S 3I0" }, { "name": "Xavier", "id": "Z0N 0L5" }, { "name": "Quynn", "id": "D1V 7B8" }, { "name": "Christine", "id": "A2X 0Z8" }, { "name": "Matthew", "id": "L1H 2I4" }, { "name": "Simon", "id": "L2Q 7V7" }, { "name": "Evan", "id": "Z8Y 6G8" }, { "name": "Zachary", "id": "F4K 8V9" }, { "name": "Deborah", "id": "I0D 4J6" }, { "name": "Carl", "id": "X7H 3J3" }, { "name": "Colin", "id": "C8P 0O1" }, { "name": "Xenos", "id": "K3S 1H5" }, { "name": "Sonia", "id": "W9C 0N3" }, { "name": "Arsenio", "id": "B0M 2G6" }, { "name": "Angela", "id": "N9X 5O7" }, { "name": "Cassidy", "id": "T8T 0Q5" }, { "name": "Sebastian", "id": "Y6O 0A5" }, { "name": "Bernard", "id": "P2K 0Z5" }, { "name": "Kerry", "id": "T6S 4T7" }, { "name": "Uriel", "id": "K6G 5V2" }, { "name": "Wanda", "id": "S9G 2E5" }, { "name": "Drake", "id": "G3G 8Y2" }, { "name": "Mia", "id": "E4F 4V8" }, { "name": "George", "id": "K7Y 4L4" }, { "name": "Blair", "id": "Z8E 0F0" }, { "name": "Phelan", "id": "C5Z 0C7" }, { "name": "Margaret", "id": "W6F 6Y5" }, { "name": "Xaviera", "id": "T5O 7N5" }, { "name": "Willow", "id": "W6K 3V0" }, { "name": "Alden", "id": "S2M 8C1" }, { "name": "May", "id": "L5B 2H3" }, { "name": "Amaya", "id": "Q3B 7P8" }, { "name": "Julian", "id": "W6T 7I6" }, { "name": "Colby", "id": "N3Q 9Z2" }, { "name": "Cole", "id": "B5G 0V7" }, { "name": "Lana", "id": "O3I 2W9" }, { "name": "Dieter", "id": "J4A 9Y6" }, { "name": "Rowan", "id": "I7E 9U4" }, { "name": "Abraham", "id": "S7V 0W9" }, { "name": "Eleanor", "id": "K7K 9P4" }, { "name": "Martina", "id": "V0Z 5Q7" }, { "name": "Kelsie", "id": "R7N 7P2" }, { "name": "Hedy", "id": "B7E 7F2" }, { "name": "Hakeem", "id": "S5P 3P6" }];
    $scope.viewby = 10;
    $scope.totalItems = $scope.data.length;
    $scope.currentPage = 4;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
    };
};

angular
    .module('inspinia')
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    })
    .controller('PaginationDemoCtrl', PaginationDemoCtrl)
    .controller('SetsNgCtrl', SetsNgCtrl);


