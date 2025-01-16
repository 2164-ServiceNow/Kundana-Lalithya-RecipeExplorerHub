var app = angular.module('recipeApp', []);

app.controller('MainController', function($scope, $http) {
    $scope.ingredient = "";
    $scope.recipes = [];

    $scope.searchRecipes = function() {
        var url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + $scope.ingredient;

        $http.get(url).then(function(response) {
            $scope.recipes = response.data.meals;
        }, function(error) {
            console.error("Error fetching recipes:", error);
        });
    };
});
