angular.module('RecipeBookApp')
    .service('RecipeService', ['$http', function($http) {
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

        // Get available areas
        this.getAreas = function() {
            return $http.get(apiUrl + 'list.php?a=list');
        };

        // Search recipes by query
        this.searchRecipes = function(query) {
            return $http.get(`${apiUrl}search.php?s=${query}`);
        };

        // Get recipe details by ID
        this.getRecipeDetails = function(id) {
            return $http.get(`${apiUrl}lookup.php?i=${id}`);
        };
    }]);
