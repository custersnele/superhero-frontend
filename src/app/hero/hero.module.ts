import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroRoutingModule } from './hero-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes/heroes.component';
import { HerosDetailComponent } from './hero-detail/heros-detail.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroRoutingModule
  ],
  declarations: [HeroesComponent, HerosDetailComponent, AddHeroComponent, EditHeroComponent]
})
export class HeroModule { }
