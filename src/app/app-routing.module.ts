import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieCreateComponent } from './components/movie-create/movie-create.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-movie' },
  { path: 'create-movie', component: MovieCreateComponent },
  { path: 'edit-movie/:id', component: MovieEditComponent },
  { path: 'movies-list', component: MovieListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }