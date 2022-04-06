import {Hero} from '../hero/hero.interface';
import {Mission} from './mission.interface';

export interface MissionDetail extends Mission{
  superheroes?: Hero[];
}
