'use strict';

var tableObj = new Array();
var pmsTable = function ($http) {
    return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {
            debugger;
            tableObj[attrs.id] = element;
            var dataTable;

            //   setTimeout(function () {
            if (angular.isDefined(scope.options)) {
                dataTable = element.dataTable(scope.options);

            }
            scope.$watch('options.aaData', handleModelUpdates, true);
            // scope.$watch('options', TableChangeEvent, true);
            //}, 400);

            //scope.$watch('options.aaData', handleModelUpdates, true);
            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    if (dataTable != undefined) {
                        dataTable.fnClearTable();
                        dataTable.fnAddData(data);
                    }
                }
            }


            element.on('click', 'tbody tr td', function (event, args) {
                $('#tblDetails tbody tr').removeClass('rowSelected');
                $($(this).parent()[0]).toggleClass('rowSelected');

                var source = $($($(this).parent()[0]).children()[1]).text();
                var dest = $($($(this).parent()[0]).children()[2]).text();

                $http({
                    method: 'GET',
                    url: 'http://52.36.211.72:5555/gateway/Chennai/v1/bus/routenumbers?destination=' + dest + '&source=' + source,
                    headers: { 'x-Gateway-APIKey': '1b4fb752-cafe-4df3-b0b4-0384fb10b36f' }
                }).success(function (data) {


                    var busDetails = "";
                    for (var i = 0; i < data.length; i++) {                       
                            busDetails = data[i].route_Num + "</br>";                      
                        
                    }


                    $('#myModal .modal-body').html(busDetails);
                    $('#myModal').modal({
                        show: 'true'
                    });


                }).error(function (msg, code) {

                    console.log('Code ' + code);
                    console.log('Message' + msg);
                });




            });



            scope.$on('broadCostTableValue', function (event, args) {
                var element = tableObj[args.tableId];
                dataTable.fnClearTable();
                var dt = element.dataTable(args);
            });

            scope.$on('broadCostYvalue', function (event, args) {
                if (args.tableId == $(element).attr('id')) {
                    var tblSettings = dataTable.fnSettings();
                    if (args.y == 1)
                        tblSettings._iDisplayLength = args.y * 3;
                    else
                        tblSettings._iDisplayLength = (args.y * 10) - 12;
                    dataTable.fnDraw();
                    //In Future remove this Code it click all table
                    setTimeout(function () { $('.dataTables_scrollHeadInner table thead tr th').click(); }, 400);
                    //In Future add this Code it click specific table
                    // setTimeout(function () { $('.dataTables_scrollHeadInner table thead tr').find('[aria-controls=' + $(element).attr('id') + ']')[0].click(); }, 400);
                }

            });
        },
        scope: {
            options: "=",
            rowClickEnabled: "=",
            selectedItems: "=",
            selectedCount: "="
        }
    };
};

app.directive('pmsTable', pmsTable);

