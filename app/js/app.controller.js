angular.module('RecipeBookApp')
    .controller('RecipeController', ['$scope', 'RecipeService', function($scope, RecipeService) {
        $scope.searchQuery = '';
        $scope.selectedArea = '';
        $scope.areas = [];
        $scope.recipes = [];
        $scope.originalRecipes = [];
        $scope.selectedRecipe = null;
        $scope.ingredients = [];
        $scope.savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || []; // Load saved recipes from localStorage

        // Load areas from API
        RecipeService.getAreas().then(function(response) {
            $scope.areas = response.data.meals;
        });

        // Search recipes
        $scope.searchRecipes = function() {
            RecipeService.searchRecipes($scope.searchQuery).then(function(response) {
                $scope.recipes = response.data.meals || [];
                $scope.originalRecipes = [...$scope.recipes];
            });
        };


        // Sort recipes by cooking time (if available)
        $scope.sortRecipes = function() {
            if ($scope.selectedSort === 'time') {
                $scope.recipes = $scope.recipes.sort(function(a, b) {
                    // Assuming the cooking time is stored in 'strCookTime'
                    return a.strCookTime - b.strCookTime;
                });
            }
        };

    }]);
