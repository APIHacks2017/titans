
var PmsFactory = function ($http, $q, $rootScope) {

    var serviceBase = '/HMAccess/',
        PmsServiceFactory = { responseData: {} },
        seviceMethod;
    PmsServiceFactory.GetNewsFeed = function (serviceApi,data) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: serviceApi,
            data:data,
            headers: { 'x-Gateway-APIKey': '1b4fb752-cafe-4df3-b0b4-0384fb10b36f' }
        }).success(function (data) {
            deferred.resolve({ data: data });
        }).error(function (msg, code) {

            console.log('Code ' + code);
            console.log('Message' + msg);
        });
        return deferred.promise;
    };
    PmsServiceFactory.GetData = function (serviceApi) {
        var deferred = $q.defer();
       
        $http({
            method: 'GET',
            url: serviceApi,
            headers: { 'x-Gateway-APIKey': '1b4fb752-cafe-4df3-b0b4-0384fb10b36f' }
        }).success(function (data) {
            deferred.resolve({ data: data });
        }).error(function (msg, code) {

            console.log('Code ' + code);
            console.log('Message' + msg);
        });
        return deferred.promise;
    };
    PmsServiceFactory.PostData = function (serviceApi, postData) {

        var deferred = $q.defer();
        $http.post(serviceApi, postData).success(function (data) {
            deferred.resolve({ data: data });

        }).error(function (msg, code) {

            console.log('Code ' + code);
            console.log('Message' + msg);
        });
        return deferred.promise;
    };
    return PmsServiceFactory;
}



app.factory('PmsFactory', PmsFactory);

