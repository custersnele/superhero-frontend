import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Hero } from '../hero.interface';
import { MissionService } from 'src/app/shared/services/mission.service';
import { Mission } from 'src/app/mission/mission.interface';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HerosDetailComponent implements OnInit {
  heroId?: number;
  hero?: Hero;
  isMission = false;
  missions?: Mission[];
  selectedOption?: string;

  missionCtrl = new FormControl();

  myForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.createForm();

    // Get response based on parameter in url
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.heroId = parseInt(params.get('heroId') as string);
        return this.heroService.getSuperHeroeById(this.heroId);
      })
    ).subscribe(hero => {
      this.hero = hero;
      console.log(this.hero);
    });

    // Get all missions
    this.missionService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      mission: this.missionCtrl
    });
  }

  addMissionToHero() {

    if (!this.selectedOption) {
      return;
    }
    const missionHero = {
      missionId: this.missions?.find(m => m.missionName === this.selectedOption)?.id,
      superheroId: this.heroId
    };


    this.heroService.addMissionToHero(missionHero).subscribe(() => {
      this.hero = undefined;
      this.heroId = undefined;
      this.isMission = false;
      this.missions = undefined;
      this.selectedOption = undefined;
      this.ngOnInit();
    });
  }

  public saveCode(e: Event): void {
    //let find = this.missions?.find(x => x?.missionName === e?.value);
    console.log(e.target);
  }

  deleteHero() {
    if (this.heroId) {
      this.heroService.deleteHero(this.heroId).subscribe(() => {
        this.router.navigateByUrl('/heroes');
      });
    }
  }

  editHero() {
    this.router.navigateByUrl('/heroes/edit/'+this.heroId);
  }

}
