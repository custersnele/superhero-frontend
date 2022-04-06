import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'missions',
    loadChildren: () => import('./mission/mission.module').then(m => m.MissionModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule)
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
