import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from 'src/app/mission/mission.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const secureHttpOptions = {headers: new HttpHeaders({Authorization: 'Basic ' + btoa('admin:admin')})};

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  missionApiUrl = 'http://localhost:8080/missions';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    return <Observable<Mission[]>> this.http.get(this.missionApiUrl);
  }

  getMissionById(missionId: number): Observable<Mission> {
    return <Observable<Mission>> this.http.get(this.missionApiUrl + '/' + missionId);
  }

  addMission(mission: Mission) {
    return this.http.post(this.missionApiUrl, mission, httpOptions);
  }

  updateMission(missionId: number, mission: Mission) {
    return this.http.put(this.missionApiUrl + '/' + missionId, mission, httpOptions);
  }

  deleteMission(missionId: number) {
    return this.http.delete(this.missionApiUrl+ '/' + missionId, secureHttpOptions);
  }
}
