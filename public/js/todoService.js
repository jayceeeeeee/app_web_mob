todoApp.factory('todoService',['$http',function($http){
    var server = {};

    server.addTask = function (name, cb) {
        var req = {
            name:name
        };
        console.log(req);
        $http.post('/addTask', req)
            .then(function (res) {
                cb(res);
            });
    };

    server.deleteTask = function(id, cb){
        var req = {id: id};
        $http.post('/deleteTask', req)
            .then(function(res){
                cb(res);
            });
    };

    server.getTaskSet = function (cb) {
        $http.post('/getTaskSet')
            .then(function (resp) {
                console.log(resp);
                cb(resp.data.taskSet);
            });
    };

    return server;
}]);