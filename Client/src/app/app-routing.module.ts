import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmyComponent } from './filmy/filmy.component';
import { FormularzComponent } from './formularz/formularz.component';

const routes: Routes = [
  { path: 'filmy', component: FilmyComponent },
  { path: 'dodawanie', component: FormularzComponent },
  { path: 'filmy/:id', component: FormularzComponent },
  { path: '', redirectTo: 'filmy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
