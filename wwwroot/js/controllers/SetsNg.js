function SetsNgCtrl($scope, $state, updateImage, $sessionStorage, $localStorage, getSetsSrvNg, passData, getSetSrv, $timeout, $q) {
    if ($sessionStorage.User === undefined) {
        $state.go("logins");
    }

    if ($state.params.viewLayout !== null) {
        $sessionStorage.viewLayout = $state.params.viewLayout;
    }

    $scope.today = function () {
        $scope.dtStart = new Date(1987, 1, 1);
        $scope.dtEnd = new Date(2020, 1, 1);
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dtStart = new Date(1987, 1, 1);
    };

    $scope.dateOptions = {
        datepickerMode: 'year',
        minMode: 'year',
        //minDate: 'minDate',
        showWeeks: 'false',
        dateDisabled: false,
        formatYear: 'yyyy',
        maxDate: $scope.dtEnd,
        minDate: $scope.dtStart,
        startingDay: 1
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['yyyy'];
    $scope.format = $scope.formats[0];
    //$scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.altInputFormats = ['yyyy/M!/d!'];
    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    if ($sessionStorage.album === undefined) {
        $sessionStorage.album = $state.params.album;
    }
    else if ($sessionStorage.album === null) {
        $sessionStorage.album = 0;
    }

    if ($sessionStorage.dtMin === undefined) {
        $sessionStorage.dtMin = $sessionStorage.album.startDate;
    }

    if ($sessionStorage.dtMax === undefined) {
        $sessionStorage.dtMax = $sessionStorage.album.endDate;
    }

    if ($localStorage.session_pglen === undefined) {
        $localStorage.session_pglen = "50";
    }

    $sessionStorage.sortby = {
        "Active": "Year",
        "Columns": [
            {
                "Column": "Description",
                "Direction": "Descending"
            }, {
                "Column": "Year",
                "Direction": "Ascending"
            }, {
                "Column": "Range",
                "Direction": "Descending"
            }, {
                "Column": "SetType",
                "Direction": "Descending"
            }]
    };

    $sessionStorage.groupby = [{
        "Column": "Range",
        "Ranges": []
        //[{ "Name": "Protea", "isChecked": true },
        //{ "Name": "Kruggerrand", "isChecked": true }]   
    }, {
        "Column": "Type",
        "Types": ["Prestige", "Launch", "Special"]
    }];

    if ($sessionStorage.yrStartSel === undefined) {
        $sessionStorage.yrStartSel = $sessionStorage.dtMin;
    }

    if ($sessionStorage.yrEndSel === undefined) {
        $sessionStorage.yrEndSel = $sessionStorage.dtMax;
    }

    $sessionStorage.filterby = [
        {
            "Column": "Year",
            "Start": $sessionStorage.yrStartSel,
            "End": $sessionStorage.yrEndSel
        },
        {
            "Column": "Range",
            "Ranges": [{ "Name": "All", "isChecked": true }]
        },
        {
            "Column": "SetType",
            "SetType": [{ "Name": "All", "isChecked": true }]
        }
    ];

    $scope.pageSize = $localStorage.session_pglen;
    $scope.viewby = $localStorage.session_pglen;

    //$scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    if ($sessionStorage.currentPage === undefined) {
        $sessionStorage.currentPage = 1;
    }

    if ($sessionStorage.numberOfPages === undefined) {
        $sessionStorage.numberOfPages = 1;
    }

    $scope.setPage = function (pageNo) {
        $sessionStorage.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $scope.getsets();
    };

    $scope.setItemsPerPage = function (num) {
        $localStorage.session_pglen = num;
        $sessionStorage.iColSets = undefined;
        $scope.getsets();
    };

    $scope.getsets = () => {
        if ($sessionStorage.iColSets === undefined) {
            getSetsSrvNg.get({
                start: ($sessionStorage.currentPage - 1) * $localStorage.session_pglen,
                length: $sessionStorage.currentPage * $localStorage.session_pglen,
                sortby: JSON.stringify($sessionStorage.sortby),
                filterby: JSON.stringify($sessionStorage.filterby),
                groupby: JSON.stringify($sessionStorage.groupby),
                albumId: $sessionStorage.album.albumId
            }).$promise.then(function (response) {
                $sessionStorage.iColSets = JSON.parse(JSON.stringify(response));
                $scope.dtMin = $sessionStorage.iColSets.yrstartmin;
                $scope.yrEndMax = $sessionStorage.iColSets.yrendmax;
                angular.forEach($sessionStorage.iColSets.data, function (set) {
                    if (set.items.length > 0) {
                        set.delItems = set.items.filter(item => item.isActive === false);
                        set.items = set.items.sort(function (a, b) {
                            return a.position - b.position;
                        }).filter(item => item.isActive === true);
                    }
                });
                $sessionStorage.numberOfPages = Math.ceil($sessionStorage.iColSets.recordsTotal / $localStorage.session_pglen);
            }, function (error) {
                alert("Error getting orders from back-end : " + error);
            });
        }
    };

    $scope.sortBy = function (column) {
        var sortCol = $sessionStorage.sortby.Columns.find(a => a.Column === column);
        if (sortCol.Direction === "Ascending") {
            sortCol.Direction = "Descending";
        }
        else {
            sortCol.Direction = "Ascending";
        }
        $sessionStorage.sortby.Active = column;
        $scope.getsets();
    };

    $scope.sortBy("Year");

    $scope.filterRange = (range) => {
        var ftrType = $sessionStorage.filterby.find(a => a.Column === "Range");
        var curRange = ftrType.Ranges.find(a => a.Name === range);
        if (curRange !== undefined) {
            return curRange.isChecked;
        }
        return false;
    };

    $scope.filterSetType = (type) => {
        var ftrType = $sessionStorage.filterby.find(a => a.Column === "SetType");
        var curType = ftrType.SetType.find(a => a.Name === type);
        if (curType !== undefined) {
            return curType.isChecked;
        }
        return false;
    };

    $scope.filterRangeChange = (event) => {
        var ftrType = $sessionStorage.filterby.find(a => a.Column === "Range");
        var range = ftrType.Ranges.find(a => a.Name === event.key);
        if (range !== undefined) {
            range.isChecked = event.isChecked;
        }
        else {
            ftrType.Ranges.push({ "Name": event.key, "isChecked": true });
        }
        $scope.getsets();
    };

    $scope.filterSetTypeChange = (event) => {
        var ftrType = $sessionStorage.filterby.find(a => a.Column === "SetType");
        var type = ftrType.SetType.find(a => a.Name === event.key);
        if (type !== undefined) {
            type.isChecked = event.isChecked;
        }
        else {
            ftrType.SetType.push({ "Name": event.key, "isChecked": true });
        }
        $scope.getsets();
    };


    $scope.filterDate = () => {
        var ftrYear = $sessionStorage.filterby.find(a => a.Column === "Year");
        ftrYear.Start = $sessionStorage.yrStartSel;
        ftrYear.End = $sessionStorage.yrEndSel;

        $scope.getsets();
    };

    $scope.selectSet = (event, setidx) => {
        var set = $sessionStorage.iColSets.data[setidx];
        getSetSrv.get({ id: set.setId }).$promise.then(function (response) { //we need to get full images from server
            set = JSON.parse(JSON.stringify(response));
            if (set.items.length > 0) {
                set.delItems = set.items.filter(item => item.isActive === false);
                set.items = set.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            $sessionStorage.curSetIdx = setidx;
            $sessionStorage.iColSets.data[setidx] = set;
            $state.go('app.set');
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.SelectItem = (event, setidx, itemidx, direction) => {
        var items = $sessionStorage.iColSets.data[setidx].items;
        var item = items[itemidx];

        if (itemidx === 0) {
            items.forEach(function (item) {
                if (item.userItems.length === 0) {
                    item.userItems.push({ userId: $sessionStorage.name, itemId: item.itemId, quantity: 0 });
                }
                item.userItems[0].quantity = item.userItems[0].quantity + direction;
            });
        } else {
            if (item.userItems.length === 0) {
                item.userItems.push({ userId: $sessionStorage.name, itemId: item.itemId, quantity: 0 });
            }
            item.userItems[0].quantity = item.userItems[0].quantity + direction;
        }  //0 here should be user find, do user filtering on api change entity []->{}

        $scope.entry = new updateImage($sessionStorage.iColSets.data[setidx]);
        $scope.entry.$update(function (response) {

        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.createSet = function (id) {
        if (id === undefined) {
            var iCol = new getSetSrv();
            iCol.setImages = [];
            iCol.delImages = [];
            //passData.set("Selected", iCol);
            $state.go('app.set');
        }
    };

    $(function () {
        $('.selectpicker').selectpicker();
    });

}

angular
    .module('inspinia')
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    })
    //.controller('PaginationDemoCtrl', PaginationDemoCtrl)
    .controller('SetsNgCtrl', SetsNgCtrl);


