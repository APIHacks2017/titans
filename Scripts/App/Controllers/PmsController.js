
var PmsController = function ($rootScope, $scope, PmsFactory) {

    $scope.myInvestmentData = [
      { col: 0, row: 0, sizeY: 2, sizeX: 4, height: "100%", width: '100%', id: "1", "name": "../../../PartialView/RootDetails.html", Header: "Root Details" },
    { col: 0, row: 0, sizeY: 2, sizeX: 4, height: "100%", width: '100%', id: "2", "name": "Performance Tile", Header: "Root Details" },


    ];

    var fulePriceApiCity = 'http://52.36.211.72:5555/gateway/FuelPriceIndia/1.0/main/city_list';
    $scope.fulePriceCities = [];
    $scope.Fuel = { selectedFuel: 'Chennai' };
    $scope.fuleType = "petrol";
    $scope.fulePrice = 0.0;


    function makeselect2() {
        $("body select").select2();
    }
    $scope.GetFulePriceCities = function () {
        PmsFactory.GetData(fulePriceApiCity).then(function (response) {
            $scope.fulePriceCities = response.data.cities;
            makeselect2();
            $scope.GetPetrolPrice($scope.fuleType);
        })
    }
    $scope.ChangePriceCities = function () {
        $scope.GetPetrolPrice($scope.fuleType);
    }

    $scope.GetPetrolPrice = function (type) {
        $scope.fuleType = type;
        
        fulePriceApiCity = "http://52.36.211.72:5555/gateway/FuelPriceIndia/1.0/main/" + $scope.Fuel.selectedFuel + "/" + type + '/price';
        PmsFactory.GetData(fulePriceApiCity).then(function (response) {
            $scope.fulePrice = response.data.price;
            $scope.showFuelPrice = true;
            setTimeout(function () {
                $scope.showFuelPrice = false;
            }, 5000);
        })
    }



    var newscat = 'business, entertainment, gaming, general, music, politics, science-and-nature, sport, technology';
    var lan = 'en, de, fr';
    $scope.newsLanguage = lan.split(',');
    $scope.newsCategory = newscat.split(',');
    $scope.News = { newsSelectedLan: "en" };
    $scope.News = { newsSelectedCategory: 'business' };
    $scope.showFuelPrice = false;

    var newsApi = 'http://52.36.211.72:5555/gateway/NewsAPI/1.0/sources?category=' + $scope.News.newsSelectedCategory;
    $scope.GetNewsFeed = function () {
        debugger;
        $scope.NewsData = [];
        //var getData = {
        //    category: $scope.News.newsSelectedCategory,
        //    country: 'in',
        //    language: $scope.News.newsSelectedLan
        //};
        newsApi = 'http://52.36.211.72:5555/gateway/NewsAPI/1.0/sources?category=' + $scope.News.newsSelectedCategory;
        PmsFactory.GetData(newsApi).then(function (response) {
            $scope.NewsData = response.data.sources;

        })
    }
    var busDetails = 'http://52.36.211.72:5555/gateway/Chennai/v1/bus/routes';
    $scope.busDetails = [];
    function getTableConfig() {
        return {
            aaData: [],
            rowReorder: true,
            "destroy": true,
            colReorder: true,
            "bDeferRender": true,
            "iDisplayLength": 5,
            bLengthChange: false,
            columns: [],
            "lengthMenu": [5,10, 25, 50, 75, 100],
            "aaSorting": [[0, "desc"]],
            columnDefs: [{ "bSortable": true }],
            fnRowCallback: function (nRow, aData, iDisplayIndex) {
                $(nRow).children().removeClass('centerHeaderText');
                $(nRow).addClass('leftAlign');
            }
        };
    }
    $scope.displayBus = false;
    $scope.getBusDetails = function () {
        PmsFactory.GetData(busDetails).then(function (response) {

            var options = getTableConfig();
            options.aaData = response.data;
            options.columns = getColumnDetails(Object.keys(response.data[0]));
            $scope.busDetails = options;

            $scope.displayBus = true;
        })
    }
    $scope.SpeachNews = function (speachText) {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[10]; // Note: some voices don't support altering params
            msg.voiceURI = 'native';
            msg.volume = 1; // 0 to 1
            msg.rate = 1; // 0.1 to 10
            msg.pitch = 2; //0 to 2
            msg.text = speachText;
            msg.lang = 'en-US';

            msg.onend = function (e) {
                console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };

            speechSynthesis.speak(msg);
        }

    }
    function getColumnDetails(columns) {
        var columnDetails = [];
        for (var i = 0; i < columns.length; i++) {
            columnDetails.push({ "title": columns[i], "data": columns[i] });
        }
        return columnDetails;
    }
    $scope.getThought = function () {
        PmsFactory.GetData('http://52.36.211.72:5555/gateway/TrumpThoughts/1.0/random').then(function (response) {

            $scope.thought = response.data.message;

        })
    }
    $scope.gridsterOptions = {
        margins: [20, 20],
        columns: 4,
        colWidth: 400,
        rowHeight: 275,

        resizable: {
            enabled: false,

        },
        draggable: {
            handle: 'h3',
            enabled: true
        }
    };
    debugger;
    $scope.getThought();
    $scope.GetFulePriceCities();
    $scope.GetNewsFeed();
    $scope.getBusDetails();
    $scope.SpeachNews('Welcome to Quick Reference');
};
app.controller('PmsController', PmsController);