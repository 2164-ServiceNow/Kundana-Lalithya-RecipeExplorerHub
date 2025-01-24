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
          // Filter recipes by selected area
          $scope.filterRecipes = function() {
            if ($scope.selectedArea) {
                $scope.recipes = $scope.originalRecipes.filter(recipe => recipe.strArea === $scope.selectedArea);
            } else {
                $scope.recipes = [...$scope.originalRecipes];
            }
        };
        
        // View recipe details
        $scope.viewRecipe = function(recipeId) {
            RecipeService.getRecipeDetails(recipeId).then(function(response) {
                $scope.selectedRecipe = response.data.meals[0];
                $scope.ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    let ingredient = $scope.selectedRecipe[`strIngredient${i}`];
                    let measure = $scope.selectedRecipe[`strMeasure${i}`];
                    if (ingredient && ingredient.trim()) {
                        $scope.ingredients.push(`${ingredient} - ${measure}`);
                    }
                }
            });
        };

        // Go back to results
        $scope.goBack = function() {
            $scope.selectedRecipe = null;
        };
         // Save recipe to localStorage
        $scope.saveRecipe = function(recipe) {
            // Check if the recipe is already saved
            let existingRecipe = $scope.savedRecipes.find(r => r.idMeal === recipe.idMeal);
            if (!existingRecipe) {
                // Save it if not already saved
                $scope.savedRecipes.push(recipe);
                localStorage.setItem('savedRecipes', JSON.stringify($scope.savedRecipes)); // Update localStorage
            }
        };
        
        // Clear saved recipes from Local Storage and scope
        $scope.clearSavedRecipes = function() {
            localStorage.removeItem('savedRecipes'); // Remove saved recipes from localStorage
            $scope.savedRecipes = []; // Clear the saved recipes from the UI
        };

        $scope.downloadEbook = function() {
            if ($scope.recipes.length === 0) {
                alert('No recipes found!');
                return;
            }
        };


    }]);
