import { AgalListDisplayModality } from "@agal-core/enum/list-display-modality";
import { Directive, Input, OnInit, SimpleChanges } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { AgalCommonService } from "../services/common.service";
import { AgalGenericComponent } from "./agal-generic-component";

@Directive()
export abstract class AgalGenericTable extends AgalGenericComponent implements OnInit {
	_filters: any = {};

	@Input()
	set filters(filters: any) {
		this._filters = filters;
		console.log("filterss on set", filters);
		//this.loadData();
	}
    
    @Input()
    view: AgalListDisplayModality = AgalListDisplayModality.TABLE;
    @Input()
    dcs: string[] = ['_ck', 'id'];
    @Input()
    buttons: any[];

	constructor(
        agcs: AgalCommonService
	) { super(agcs); }

	loading: boolean = false;

	ds: any[];
	totalRecords: number = 0;

	selectedElements: any[] = [];

	private pageable: any = {};
	private sort: string[] = [];

	ngOnInit(): void {
		//this.loadData();
	}

	async changePagination(event: any) {
		this.pageable = event;
	
		console.log("changePagination");
		await this.loadData();
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log("ngOnChanges", changes);
		this.loadData();
	}

    lazyLoad(event: LazyLoadEvent) {
        this.sort = [];
        if(event.sortField !== undefined) {
            let sortable: string = event.sortField + ',';
            sortable += (event.sortOrder > 0) ? 'asc' : 'desc';
            this.sort.push(sortable);
        }

        if(this.sort.length > 0) {
			console.log("lazyLoad");
            this.loadData();
        }
    }

	decoreButtons(items: any[], e: any) {
		for(let item of items) {
			item.data = e;
		}
		return items;
	}

    async loadData() {
		if(this.loading) {
			return;
		}
		this.loading = true;
		{
			let filters = this._filters;
			console.log(this._filters);
			if(this.pageable.page !== undefined) {
				filters.page = this.pageable.page;
				filters.size = this.pageable.size;
			}
			if(this.sort.length > 0) {
				filters.sort = this.sort;
			}
			await this.callApi(filters);
		}
        this.loading = false;
    }

	protected async callApi(filters: any) { }
}