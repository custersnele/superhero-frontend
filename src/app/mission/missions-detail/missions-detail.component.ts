import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MissionService } from 'src/app/shared/services/mission.service';
import { Mission } from '../mission.interface';
import {MissionDetail} from '../mission-detail.interface';

@Component({
  selector: 'app-missions-detail',
  templateUrl: './missions-detail.component.html',
  styleUrls: ['./missions-detail.component.css']
})
export class MissionsDetailComponent implements OnInit {

  mission?: MissionDetail;
  missionId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    // Get response based on parameter in url
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.missionId = parseInt(params.get('missionId') as string);
        return this.missionService.getMissionById(this.missionId);
      })
    ).subscribe(mission => {
      this.mission = mission;
      console.log(this.mission);
    });
  }

  deleteMission() {
    if (this.missionId) {
      this.missionService.deleteMission(this.missionId).subscribe(() => {
        this.router.navigateByUrl('/missions');
      });
    }
  }

  editMission() {
    this.router.navigateByUrl('/missions/edit/'+this.missionId);
  }

}
