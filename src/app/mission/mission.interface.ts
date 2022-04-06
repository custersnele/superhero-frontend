import {Hero} from '../hero/hero.interface';

export interface Mission {
  id?: number;
  missionName: string;
  completed: boolean;
  deleted: boolean;
}
