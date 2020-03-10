
function SetsCtrl($scope, $state, DTOptionsBuilder, DTColumnBuilder, $compile, $templateCache, getSetSrv, passData, $timeout) {
    $scope.session_pglen = passData.get("Session_PgLen");
    if ($scope.session_pglen === undefined) { $scope.session_pglen = 50; }

    $scope.loadSet = function (id) {
        if (id === undefined) {
            var iCol = new getSetSrv();
            iCol.items = [];
            iCol.delImages = [];
            passData.set("Selected", iCol);
            $state.go('app.set', {});
        }
        else {
            getSetSrv.get({ id: id }).$promise.then(function (response) {
                var iCol = JSON.parse(JSON.stringify(response));
                iCol.delImages = iCol.items.filter(img => img.isActive === false);
                iCol.items = iCol.items.sort(function (a, b) {
                    return a.position - b.position;
                }).filter(img => img.isActive === true);
                passData.set("Selected", iCol);
                $state.go('app.set', {});
            },
                function (error) {
                    alert("Error getting orders from back-end : " + error);
                });
        }
    };

    $scope.dtColumns1 = [
        //here We will add .withOption('name','column_name') for send column name to the server to filter and sort
        DTColumnBuilder.newColumn(null).withTitle('Image').notSortable().withOption('width', '50%')//.withClass('td-large')
            .renderWith(function (data, type, full, meta) {
                if (data.items.length > 0) {
                    data.delImages = data.items.filter(img => img.isActive === false);

                    data.items = data.items.sort(function (a, b) {
                        return a.position - b.position;
                    }).filter(img => img.isActive === true);

                    html = '';
                    data.items.forEach(function (img, index) {
                        if (img.isActive === true) {
                            html += '<div class="iColcontainer">';
                            if (index === 0) {
                                html += '<img ng-click="loadSet(' + data.setId + ')" style="margin-right : 25px;border:2px solid grey" id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
                                html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
                            }
                            else {
                                html += '<img style="width:80%;height:80%;border:2px solid grey " id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
                                html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
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

        //DTColumnBuilder.newColumn("setId", "Set Id").withOption('name', 'setId').
        //    renderWith(function (data, type, full, meta) {
        //        return '<a ng-click="loadSet(' + data + ')">' + data + '</a>';
        //    }),
        DTColumnBuilder.newColumn("year", "Year").withOption('name', 'year'),
        DTColumnBuilder.newColumn("description", "Description").withOption('name', 'description'),
        DTColumnBuilder.newColumn("date", "Date").withOption('name', 'date'),
        DTColumnBuilder.newColumn("range", "Range").withOption('name', 'range'),
        DTColumnBuilder.newColumn("catCode", "CatCode").withOption('name', 'catCode')
    ];

    $scope.dtOptions1 = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            dataSrc: "data",
            //url: "/home/getData",
            url: "api/Sets/getData",
            type: "POST"
        })
        //.withOption('ajax', function (data, callback, settings) {
        //    var test = getData().$promise.then(function (response) {
        //        var iCol = JSON.parse(JSON.stringify(response));
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
            //console.log("test");
        })
        .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
        .withDisplayLength($scope.session_pglen) // Page size
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
            passData.set("Session_PgLen", table.page.len());

            //table.on('select', function () {
            //    alert('Selected!');
            //    // Enable/disable buttons here...
            //});

            //table.on('page.dt', function () {
            //    console.log('Page');
            //});
        })
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {
                text: 'New',
                action: function (e, dt, node, config) {
                    $scope.loadSet(undefined);
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

    $scope.dtInstanceCallback = (dtInstance) => {
        dtInstance.DataTable.on('draw.dt', () => {
            let elements = angular.element("#" + dtInstance.id + " .ng-scope");
            angular.forEach(elements, (element) => {
                $compile(element)($scope);
            });
        });

        //dtInstance.DataTable.on('page.dt', () => {
        //    console.log('Page');
        //});
    };

    $scope.SelectPart = (part) => {
        if (part.currentTarget.checked === true) {
            part.currentTarget.previousSibling.style.border = "2px solid lime";
        }
        else {
            part.currentTarget.previousSibling.style.border = "2px solid grey";
        }
        // element = angular.element("#" + part.id + " .ng-scope");
        // $state.go('app.sets');
        //$compile(part.currentTarget.previousSibling)($scope);
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
    //                    data.delImages = data.items.filter(img => img.isActive === false);

    //                    data.items = data.items.sort(function (a, b) {
    //                        return a.position - b.position;
    //                    }).filter(img => img.isActive === true);

    //                    html = '';
    //                    data.items.forEach(function (img, index) {
    //                        if (img.isActive === true) {
    //                            html += '<div class="iColcontainer">';
    //                            if (index === 0) {
    //                                html += '<img style="margin-right : 25px;border:2px solid grey" id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
    //                                html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
    //                            }
    //                            else {
    //                                html += '<img style="width:80%;height:80%;border:2px solid grey " id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
    //                                html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
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