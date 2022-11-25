import { Directive } from "@angular/core";
import { AgalCommonService } from "../services/common.service";

@Directive()
export abstract class AgalGenericComponent {
    constructor(
        public acs: AgalCommonService,
    ) { }
}