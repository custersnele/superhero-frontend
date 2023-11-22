import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/hero/hero.interface';
import {MissionHero} from "../../hero/missionHero.interface";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const secureHttpOptions = {headers: new HttpHeaders({Authorization: 'Basic ' + btoa('admin:admin')})};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  heroApiUrl = 'http://localhost:8080/superheroes';

  constructor(private http: HttpClient) { }

  getSuperHeroes(): Observable<Hero[]> {
    return <Observable<Hero[]>> this.http.get(this.heroApiUrl);
  }

  getSuperHeroById(heroId: number): Observable<Hero> {
    return <Observable<Hero>> this.http.get(this.heroApiUrl + '/' + heroId);
  }

  addHero(hero: Hero) {
    return this.http.post(this.heroApiUrl, hero, httpOptions);
  }

  updateHero(heroId: number, hero: Hero) {
    return this.http.put(this.heroApiUrl + '/' + heroId, hero, httpOptions);
  }

  addMissionToHero(missionHero: MissionHero) {
    return this.http.post(this.heroApiUrl + '/add-superhero-to-mission', missionHero, httpOptions);
  }

  deleteHero(heroId: number) {
    return this.http.delete(this.heroApiUrl+ '/' + heroId, secureHttpOptions);
  }

  getIdCard(heroId: number) {
    let headers= new HttpHeaders({
      'Content-Type':  'application/pdf',
      responseType : 'blob',
      Accept : 'application/pdf',
      observe : 'response'
    })

    return this.http.get(this.heroApiUrl + "/" + heroId + "/idcard", { headers, responseType: "blob" });
  }

}
