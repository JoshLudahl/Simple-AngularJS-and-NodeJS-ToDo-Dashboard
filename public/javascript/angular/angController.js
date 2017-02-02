angular.module('todoController', [])

    .controller('listController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
        $scope.formData = {};
        $scope.todos = {};
        //call the list


        Todos.get().success(function (data) {
            $scope.todos = data;
        });

        //create item
        $scope.createTodo = function () {
            if ($scope.formData.item != undefined) {
                Todos.create($scope.formData)
                    .success(function (data) {
                        $scope.formData = {};
                        $scope.todos = data;
                    });
            }
        };

        //delete list item
        $scope.deleteTodo = function (id) {
            Todos.delete(id).success(function (data) {
                $scope.todos = data;
            });
        };
    }]);
