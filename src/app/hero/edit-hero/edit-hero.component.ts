import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Hero } from '../hero.interface';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  hero?: Hero;
  heroId?: number;
  heroForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.createForm();

    // Get response based on parameter in url
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.heroId = parseInt(params.get('heroId') as string);
        return this.heroService.getSuperHeroById(this.heroId);
      })
    ).subscribe(hero => {
      this.hero = hero;
      this.heroForm.patchValue(hero);
      console.log(this.hero);
    });
  }

  private createForm() {
    this.heroForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      superheroName: new FormControl('', Validators.required),
      // missions: new FormControl('')
    });
  }

  updateHero() {
    const newHero = {
      firstName: this.heroForm.value.firstName,
      lastName: this.heroForm.value.lastName,
      superheroName: this.heroForm.value.superheroName,
      // missions: this.hero.missions
    };

    if (this.heroId) {
      this.heroService.updateHero(this.heroId, newHero).subscribe(() => {
        this.router.navigateByUrl('/heroes/' + this.heroId);
      });
    }
  }

}
