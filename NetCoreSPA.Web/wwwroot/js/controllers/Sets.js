function SetsCtrl($scope, $state, DTOptionsBuilder, DTColumnBuilder, $compile, $templateCache, getSetSrv, passData, $timeout, updateImage, updateUserItem) {

    //$scope.SetsPgLen = sessionStorage.getItem('SetsPgLen');
    //if ($scope.SetsPgLen == undefined) sessionStorage.setItem("SetsPgLen", "10");
    $scope.session_pglen = passData.get("Session_PgLen");
    if ($scope.session_pglen === undefined) { $scope.session_pglen = 50; }

    $scope.createSet = function () {
        passData.set("CurSet", { items: [], delItems: [] });
        $state.go('app.set');
    };

    $scope.loadSet = function (id) {
        getSetSrv.get({ id: id }).$promise.then(function (response) {
            var curSet = JSON.parse(JSON.stringify(response));
            curSet.delItems = curSet.items.filter(item => item.isActive === false);
            curSet.items = curSet.items.sort(function (a, b) {
                return a.position - b.position;
            }).filter(item => item.isActive === true);
            passData.set("CurSet", curSet);
            $state.go('app.set', {});
        },
            function (error) {
                alert("Error getting orders from back-end : " + error);
            });
    };

    $scope.dtColumnsSets = [
        //here We will add .withOption('name','column_name') for send column name to the server to filter and sort
        DTColumnBuilder.newColumn(null).withTitle('Image').notSortable().withOption('width', '50%')//.withClass('td-large')
            .renderWith(function (set, type, full, meta) {
                if (set.items.length > 0) {
                    set.delItems = set.items.filter(img => img.isActive === false);

                    set.items = set.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(img => img.isActive === true);

                    html = '';
                    set.items.forEach(function (item, index) {
                        if (item.isActive === true) {
                            html += '<div class="SetContainer">';
                            if (index === 0) {
                                html += '<img ng-click="loadSet(' + set.setId + ')" style="margin-right : 25px;border:2px solid grey" id="ImgId' + item.id + item.setId + '" ng-src="data:' + item.type + ';base64,' + item.thumbnail + '"/>';
                                if (item.userItems.length !== 0) {
                                    html += '<span class="ItemCheckbox" style="padding-bottom : 15px;">' + item.userItems[index].quantity + '</span>';
                                }
                                html += '<a ng-click= "SelectItem($event, ' + index + ',' + item.setId + ',' + true + ')" type="button" class="ItemCheckbox"><i class="fa fa-plus" style="padding-bottom:30px;font-size:16px;color:green"></i></a>';
                                html += '<a ng-click= "SelectItem($event, ' + index + ',' + item.setId + ',' + false + ')" type="button" class="ItemCheckbox"><i class="fa fa-minus" style="font-size:16px;color:red"></i></a>';
                               
                            }
                            else {
                                html += '<img style="width:80%;height:80%;border:2px solid grey " id="ImgId' + item.id + item.setId + '" ng-src="data:' + item.type + ';base64,' + item.thumbnail + '"/>';
                                html += '<a name="Up_' + set.setId + '" ng-click= "SelectItem($event, ' + index + ',' + item.setId + ',' + true + ')" type="button" class="ItemCheckbox"><i class="fa fa-caret-up" style="padding-bottom:13px;font-size:24px;color:lime"></i></a>';
                                html += '<a name="Down_' + set.setId + '" ng-click= "SelectItem($event, ' + index + ',' + item.setId + ',' + false + ')" type="button" class="ItemCheckbox"><i class="fa fa-caret-down" style="font-size:24px;color:red"></i></a>';
                            }
                            html += '</div>';
                        }
                    });
                    return html;
                }
                else {
                    return null;
                }
            }),
        DTColumnBuilder.newColumn("description", "Description").withOption('name', 'description')
            .renderWith(function (data, type, full, meta) {
                return '<a ng-click="loadSet(' + full.setId + ')">' + data + '</a>';
            }),
        DTColumnBuilder.newColumn("year", "Year").withOption('name', 'year'),
        DTColumnBuilder.newColumn("date", "Date").withOption('name', 'date'),
        DTColumnBuilder.newColumn("range", "Range").withOption('name', 'range'),
        DTColumnBuilder.newColumn("catCode", "CatCode").withOption('name', 'catCode')
    ];

    $scope.dtOptionsSets = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            dataSrc: "data",
            //url: "/home/getData",
            url: "api/Sets/getData",
            type: "POST"
        })
        //.withOption('ajax', function (data, callback, settings) {
        //    var test = getData().$promise.then(function (response) {
        //        var sets = JSON.parse(JSON.stringify(response));
        //        return test;
        //    });
        //})
        .withOption('processing', true) //for show progress bar
        .withOption('serverSide', true) // for server side processing
        .withOption('responsive', true)
        .withOption('stateSave', true)
        .withOption('createdRow', function (row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        })
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength($scope.session_pglen) // Page size
        //.withDisplayLength($scope.SetsPgLen) // Page size
        .withOption('aaSorting', [1, 'asc']) // for default sorting column // here 0 means first column
        //You will only need $compile if the returned html contain directives that should be invoked, like ng - click and so on.Do that in the initComplete callback:
        //.withOption('initComplete', function () {
        //    if ($scope.toggleInit === undefined) 
        //    {
        //        $compile(angular.element('#entry-grid'))($scope);
        //    }
        //    $scope.toggleInit = true;
        //     $apply(angular.element('#entry-grid'));
        //})
        .withOption('drawCallback', function () {
            var table = this.DataTable();
            //sessionStorage.setItem("SetsPgLen", table.page.len());
            passData.set("Session_PgLen", table.page.len());
        })
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {
                text: 'New',
                action: function (e, dt, node, config) {
                    $scope.createSet();
                }
            },
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'ExampleFile' },
            { extend: 'pdf', title: 'ExampleFile' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.dtInstanceCallbackSets = (dtInstance) => {
        //dtInstance.DataTable.on('draw.dt', () => {
        //    let elements = angular.element("#" + dtInstance.id + " .ng-scope");
        //    angular.forEach(elements, (element) => {
        //        $compile(element)($scope);
        //    });
        //});
    };

    $scope.updateUserItem = function (item) {
        var clone = Object.assign({}, item);
        //clone.items = clone.items.concat(clone.delItems);
        $scope.entry = new updateUserItem(clone);
        $scope.entry.$update(function (response) {

            alert("Saved successfully...");
        }, function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.SelectItem = (event,index, setId, direction) => {
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

            curUserItems = curSet.items[index];
            if (index === 0) {
                if (curUserItems.userItems.length === 0) {
                    curUserItems.userItems.push({ userId: $scope.User.name, itemId: curUserItems.itemId, quantity: 1 });
                }
                else {
                    if (direction === true) {
                        curUserItems.userItems[index].quantity++;
                        event.currentTarget.previousSibling.innerText = curUserItems.userItems[index].quantity;

                    }
                    else
                    {
                        curUserItems.userItems[index].quantity--;
                        event.currentTarget.previousSibling.previousSibling.innerText = curUserItems.userItems[index].quantity;

                    }
                }
            }

           // var clone = Object.assign({}, curSet);
            //clone.items = clone.items.concat(clone.delItems);
            $scope.entry = new updateImage(curSet);
            $scope.entry.$update(function (response) {
                
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

        if (event.currentTarget.checked === true) {
            event.currentTarget.previousSibling.style.border = "2px solid lime";
        }
        else {
            event.currentTarget.previousSibling.style.border = "2px solid grey";
        }

        //update db
    };
}

angular
    .module('inspinia')
    .controller('SetsCtrl', SetsCtrl);

    //$scope.dtColumnsjs = {
    //    "columns": [
    //        {
    //            "title": "Image",
    //            "data": "image",
    //            "width": "50%",
    //            "Sortable": "false",
    //            "render": function (data) {
    //                if (data.items.length > 0) {
    //                    data.delItems = data.items.filter(img => img.isActive === false);

    //                    data.items = data.items.sort(function (a, b) {
    //                        return a.position - b.position;
    //                    }).filter(img => img.isActive === true);

    //                    html = '';
    //                    data.items.forEach(function (img, index) {
    //                        if (img.isActive === true) {
    //                            html += '<div class="SetContainer">';
    //                            if (index === 0) {
    //                                html += '<img style="margin-right : 25px;border:2px solid grey" id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
    //                                html += '<input ng-click= "SelectItem($event)" type="checkbox" class="ItemCheckbox"/>';
    //                            }
    //                            else {
    //                                html += '<img style="width:80%;height:80%;border:2px solid grey " id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
    //                                html += '<input ng-click= "SelectItem($event)" type="checkbox" class="ItemCheckbox"/>';
    //                            }
    //                            html += '</div>';
    //                        }
    //                    });
    //                    return html;
    //                }
    //                else {
    //                    return null;
    //                }
    //            }
    //        },
    //        {
    //            "data": "id", "orderable": false,
    //            "render": function (id) {
    //                return '<a ng-click="loadSet(' + data + ')">' + data + '</a>';

    //            }
    //        }
    //    ]
    //}