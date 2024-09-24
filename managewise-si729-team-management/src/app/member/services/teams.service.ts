import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { Team } from "../model/team.entity";

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends BaseService<Team>{

  constructor() {
    super();
    this.resourceEndpoint = '/teams';
  }
}
