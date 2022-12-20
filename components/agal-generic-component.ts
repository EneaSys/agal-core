import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AgalCommonService } from "../services/common.service";

@Directive()
export abstract class AgalGenericComponent implements OnInit, OnDestroy {
    constructor(
        public agcs: AgalCommonService,
    ) { }

    protected firstLoading: boolean = false;
    protected loading: boolean = false;
    protected subscriptions: Subscription[] = [];

    ngOnInit() {
        if (!this.firstLoading) {
            this.loadData();
        }
        this.init();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    async loadData() {
        this.firstLoading = true;
        if (this.loading) {
            return;
        }
        this.loading = true;
        await this._loadData();
        this.loading = false;
    }

    async _loadData() { }

    protected init() { }
}