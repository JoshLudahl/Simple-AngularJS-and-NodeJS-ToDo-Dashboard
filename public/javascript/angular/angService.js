angular.module('todoService', [])

    // super simple service
    // each function returns a promise object
    .factory('Todos', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/dashboard/todo');
            },
            create : function(todoData) {
                return $http.post('/dashboard/todo', todoData);
            },
            delete : function(id) {
                return $http.delete('/dashboard/todo/' + id);
            }
        }
    }]);