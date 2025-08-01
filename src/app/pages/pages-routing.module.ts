import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'ratio-list', pathMatch: 'full' },
      {
        path: 'found-page',
        loadComponent: () =>
          import('./pages/found-page/found-page.component').then(
            (m) => m.FoundPageComponent
          ),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/Not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
