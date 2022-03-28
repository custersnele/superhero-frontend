import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Hero } from '../hero.interface';
import { MissionService } from 'src/app/shared/services/mission.service';
import { Mission } from 'src/app/mission/mission.interface';

@Component({
  selector: 'app-heros-detail',
  templateUrl: './heros-detail.component.html',
  styleUrls: ['./heros-detail.component.css']
})
export class HerosDetailComponent implements OnInit {
  heroId?: number;
  hero?: Hero;
  isMission = false;
  missions?: Mission[];
  selectedOption: any;

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
    const missionHero = {
      missionId: this.selectedOption.id,
      superheroId: this.heroId
    };

    this.heroService.addMissionToHero(missionHero).subscribe(() => {
      this.hero = undefined;
      this.heroId = undefined;
      this.isMission = false;
      this.missions = undefined;
      this.selectedOption = null;
      this.ngOnInit();
    });
  }

  deleteHero() {
    if (this.heroId) {
      this.heroService.deleteHero(this.heroId).subscribe(() => {
        this.router.navigateByUrl('/heros');
      });
    }
  }

  editHero() {
    this.router.navigateByUrl('/heros/edit/'+this.heroId);
  }

}
