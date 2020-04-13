﻿function SetsNgCtrl($scope, $state, updateImage, DTOptionsBuilder, $compile, $templateCache, getSetsSrvNg, passData, getSetSrv, getLookups, $timeout, $q) {

    $scope.User = passData.get("User")

    $scope.rangeGroup = passData.get("$scope.rangeGroup");
    $scope.typeGroup = passData.get("$scope.typeGroup");

    $scope.fillLookups = () => {
        getLookups.get().$promise.then(function (response) {
            var Lookups = JSON.parse(JSON.stringify(response));
            $scope.rangeGroup = Lookups.rangeGroup;
            $scope.typeGroup = Lookups.typeGroup;
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    if ($scope.rangeGroup === undefined || $scope.typeGroup === undefined) {
        $scope.fillLookups();
    }

    $scope.yrStartMin = passData.get("$scope.yrStartMin");
    if ($scope.yrStartMin === undefined) {
        $scope.yrStartMin = "1987";
    }

    $scope.yrStartMax = passData.get("$scope.yrStartMin");
    if ($scope.yrStartMax === undefined) {
        $scope.yrStartMax = "2015";
    }

    $scope.session_pglen = passData.get("Session_PgLen");
    if ($scope.session_pglen === undefined) {
        $scope.session_pglen = "50";
    }

    $scope.sortby = {
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
    $scope.groupby = [{
        "Column": "Range",
        "Ranges": []
        //[{ "Name": "Protea", "isChecked": true },
        //{ "Name": "Kruggerrand", "isChecked": true }]   
    }, {
        "Column": "Type",
        "Types": ["Prestige", "Launch", "Special"]
    }];
    $scope.yrStartSel = passData.get("$scope.yrStartSel");
    $scope.yrEndSel = passData.get("$scope.yrEndSel");

    if ($scope.yrStartSel === undefined) {
        $scope.yrStartSel = "1987";
    }

    if ($scope.yrEndSel === undefined) {
        $scope.yrEndSel = "2013";
    }

    $scope.filterby = [
        {
            "Column": "Year",
            "Start": $scope.yrStartSel,
            "End": $scope.yrEndSel
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

    $scope.pageSize = $scope.session_pglen;
    $scope.viewby = $scope.session_pglen;//10;
    
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show

    $scope.currentPage = passData.get("$scope.currentPage");
    if ($scope.currentPage === undefined) {
        $scope.currentPage = 1;
    }

    $scope.numberOfPages = passData.get("$scope.numberOfPages");
    if ($scope.numberOfPages === undefined) {
        $scope.numberOfPages = 1;
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $scope.getsets();
    };

    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;
        passData.set("$scope.iColSets", undefined); //serious, dispose , incremental...l8r!
        $scope.getsets();
        // $scope.currentPage = 1; //reset to first page
    };

    $scope.getsets = () => {
        $scope.iColSets = passData.get("$scope.iColSets");
        if ($scope.iColSets !== undefined) {
            //$scope.totalItems = $scope.iColSets.totalItems;
        } else {
            getSetsSrvNg.get({
                start: ($scope.currentPage - 1) * $scope.itemsPerPage,
                length: $scope.currentPage * $scope.itemsPerPage,
                sortby: JSON.stringify($scope.sortby),
                filterby: JSON.stringify($scope.filterby),
                groupby: JSON.stringify($scope.groupby)
            }).$promise.then(function (response) {
                $scope.iColSets = JSON.parse(JSON.stringify(response));
                $scope.yrStartMin = $scope.iColSets.yrstartmin;
                $scope.yrEndMax = $scope.iColSets.yrendmax;
                angular.forEach($scope.iColSets.data, function (set) {
                    if (set.items.length > 0) {
                        set.delItems = set.items.filter(item => item.isActive === false);
                        set.items = set.items.sort(function (a, b) {
                            return a.position - b.position;
                        }).filter(item => item.isActive === true);
                    }
                });
                $scope.numberOfPages = Math.ceil($scope.iColSets.recordsTotal / $scope.session_pglen);
            }, function (error) {
                alert("Error getting orders from back-end : " + error);
            });
        }
    };

    $scope.sortBy = function (column) {
        var sortCol = $scope.sortby.Columns.find(a => a.Column === column);
        if (sortCol.Direction === "Ascending") {
            sortCol.Direction = "Descending";
        }
        else {
            sortCol.Direction = "Ascending";
        }
        $scope.sortby.Active = column;
        $scope.getsets();
    };
    $scope.sortBy("Year");

    $scope.filterRange = (range) => {
        var ftrType = $scope.filterby.find(a => a.Column === "Range");
        var curRange = ftrType.Ranges.find(a => a.Name === range);
        if (curRange !== undefined) {
            return curRange.isChecked;
        }
        return false;
    };

    $scope.filterSetType = (type) => {
        var ftrType = $scope.filterby.find(a => a.Column === "SetType");
        var curType = ftrType.SetType.find(a => a.Name === type);
        if (curType !== undefined) {
            return curType.isChecked;
        }
        return false;
    };

    $scope.filterRangeChange = (event) => {
        var ftrType = $scope.filterby.find(a => a.Column === "Range");
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
        var ftrType = $scope.filterby.find(a => a.Column === "SetType");
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
        var ftrYear = $scope.filterby.find(a => a.Column === "Year");
        ftrYear.Start = $scope.yrStartSel;
        ftrYear.End = $scope.yrEndSel;

        $scope.getsets();
    };

    $scope.selectSet = (event, setidx) => {
        var set = $scope.iColSets.data[setidx];
        getSetSrv.get({ id: set.setId }).$promise.then(function (response) { //we need to get full images from server
            set = JSON.parse(JSON.stringify(response));
            if (set.items.length > 0) {
                set.delItems = set.items.filter(item => item.isActive === false);
                set.items = set.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(item => item.isActive === true);
            }
            passData.set("$scope.currentPage", $scope.currentPage);
            passData.set("$scope.numberOfPages", $scope.numberOfPages);
            passData.set("$scope.curSetIdx", $scope.curSetIdx = setidx);
            $scope.iColSets.data[$scope.curSetIdx] = set;
            passData.set("$scope.iColSets", $scope.iColSets);
            passData.set("$scope.yrStartSel", $scope.yrStartSel);
            passData.set("$scope.yrEndSel", $scope.yrEndSel);

            $state.go('app.set');
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.SelectItem = (event, setidx, itemidx, direction) => {
        var items = $scope.iColSets.data[setidx].items;
        var item = items[itemidx];

        $scope.User = passData.get("User");
        if ($scope.User.name === undefined) {
            alert('Login Please.');
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
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    })
    //.controller('PaginationDemoCtrl', PaginationDemoCtrl)
    .controller('SetsNgCtrl', SetsNgCtrl);

