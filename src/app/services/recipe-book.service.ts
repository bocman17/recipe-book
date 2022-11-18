import { Recipe } from './../models/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable({ providedIn: 'root' })
export class RecipeBookService {
  constructor(private shoppingService: ShoppingListService) {}

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Teriyaki',
  //     'Chicken with tasty sauce',
  //     'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/03/Teriyaki-Chicken-3.jpg',
  //     [new Ingredient('chicken', 2), new Ingredient('rice', 3)]
  //   ),
  //   new Recipe(
  //     'Rice',
  //     'Chinese tradition meal',
  //     'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg',
  //     [new Ingredient('rice', 5), new Ingredient('rice spices', 2)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
