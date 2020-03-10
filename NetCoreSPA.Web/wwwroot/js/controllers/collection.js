
function CollectionsCtrl($scope, $state, DTOptionsBuilder, DTColumnBuilder, $compile, $templateCache, getCollectionsSrv, passData, $timeout) {
    $scope.collection_pglen = passData.get("collection_pglen");
    if ($scope.collection_pglen === undefined) { $scope.collection_pglen = 10; }

    $scope.createCollection = function () {
        if (id === undefined) {
            passData.set("CurCollection", { items: [], delImages: [] });
            $state.go('app.collection');
        }
    };

    $scope.loadCollection = function (id) {
        getCollectionsSrv.get({ id: id }).$promise.then(function (response) {
            var collection = JSON.parse(JSON.stringify(response));
            collection.delImages = collection.items.filter(img => img.isActive === false);
            collection.items = collection.items.sort(function (a, b) {
                return a.position - b.position;
            }).filter(img => img.isActive === true);
            passData.set("CurCollection", collection);
            $state.go('app.collection');
        },
        function (error) {
            alert("Error getting orders from back-end : " + error);
        });
    };

    $scope.dtColumnsColls = [
        DTColumnBuilder.newColumn("name","Name").withTitle('Name')
            //.renderWith(function (data, type, full, meta) {
            //    if (data.items.length > 0) {
            //        data.delImages = data.items.filter(img => img.isActive === false);

            //        data.items = data.items.sort(function (a, b) {
            //            return a.position - b.position;
            //        }).filter(img => img.isActive === true);

            //        html = '';
            //        data.items.forEach(function (img, index) {
            //            if (img.isActive === true) {
            //                html += '<div class="iColcontainer">';
            //                if (index === 0) {
            //                    html += '<img ng-click="loadCollection(' + data.setId + ')" style="margin-right : 25px;border:2px solid grey" id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
            //                    html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
            //                }
            //                else {
            //                    html += '<img style="width:80%;height:80%;border:2px solid grey " id="ImgId' + img.id + img.setId + '" ng-src="data:' + img.type + ';base64,' + img.thumbnail + '"/>';
            //                    html += '<input ng-click= "SelectPart($event)" type="checkbox" class="iColcheckbox"/>';
            //                }
            //                html += '</div>';
            //            }
            //        });
            //        return html;
            //    }
            //    else {
            //        return null;
            //    }
        //})
        ,DTColumnBuilder.newColumn("description", "Description").withOption('name', 'Description')
    ];

    $scope.dtOptionsColls = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            dataSrc: "data",
            url: "api/Collections/getData",
            type: "POST"
        })
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
        .withDisplayLength($scope.collection_pglen) // Page size
        .withOption('aaSorting', [1, 'asc']) // for default sorting column // here 0 means first column
        .withOption('drawCallback', function () {
            var table = this.DataTable();
            passData.set("collection_pglen", table.page.len());
        })
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {
                text: 'New',
                action: function (e, dt, node, config) {
                    $scope.createCollection();
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

    $scope.dtInstanceCallbackColls = (dtInstance) => {
        dtInstance.DataTable.on('draw.dt', () => {
            let elements = angular.element("#" + dtInstance.id + " .ng-scope");
            angular.forEach(elements, (element) => {
                $compile(element)($scope);
            });
        });
    };

    $scope.SelectPart = (part) => {
        
    };
}

angular
    .module('inspinia')
    .controller('CollectionsCtrl', CollectionsCtrl);

   