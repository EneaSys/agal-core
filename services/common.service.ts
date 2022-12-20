import { AgalEventerService } from '@agal-core/modules/eventer/services/eventer.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AgalCommonService {
    constructor(
        public eventer: AgalEventerService,

    ) {}
}