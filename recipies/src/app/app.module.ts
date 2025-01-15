import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { DetailsComponent } from './details/details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SortingComponent } from './sorting/sorting.component';
import { EbookComponent } from './ebook/ebook.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    IngredientsComponent,
    SearchComponent,
    FilterComponent,
    DetailsComponent,
    FavoritesComponent,
    SortingComponent,
    EbookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
