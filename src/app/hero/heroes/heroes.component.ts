import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Hero } from '../hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.heroService.getSuperHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  addHero() {
    this.router.navigateByUrl('/heroes/add');
  }

}
