import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MissionService } from 'src/app/shared/services/mission.service';
import { Mission } from '../mission.interface';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent implements OnInit {

  mission?: Mission;
  missionId?: number;
  missionForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.createForm();

    // Get response based on parameter in url
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.missionId = parseInt(params.get('missionId') as string);
        return this.missionService.getMissionById(this.missionId);
      })
    ).subscribe(mission => {
      this.mission = mission;
      this.missionForm.patchValue(mission);
      console.log(this.mission);
    });
  }

  private createForm() {
    this.missionForm = new FormGroup({
      missionName: new FormControl('', Validators.required),
      completed: new FormControl('', Validators.required),
      deleted: new FormControl('', Validators.required),
      superheroes: new FormControl('')
    });
  }

  updateMission() {
    const newMission : Mission = {
      missionName: this.missionForm.value.missionName,
      completed: this.missionForm.value.completed,
      deleted: this.mission? this.mission.deleted : false
    };

    if (this.missionId) {
      this.missionService.updateMission(this.missionId, newMission).subscribe(() => {
        this.router.navigateByUrl('/missions/' + this.missionId);
      });
    }
  }

}
