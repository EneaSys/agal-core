import { Directive, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { AgalListDisplayModality } from "@agal-core/enum/list-display-modality";
import { LazyLoadEvent } from "primeng/api";
import { AgalCommonService } from "../services/common.service";
import { AgalGenericComponent } from "./agal-generic-component";

@Directive()
export abstract class AgalGenericTable2 extends AgalGenericComponent implements OnInit {
	_apiFilters: any = {};
		
	@Input() filters: any;
    @Input() paginator: any;
	@Input() sort: string[] = [];
	@Output() sortChange = new EventEmitter<string[]>();

    @Input() view: AgalListDisplayModality = AgalListDisplayModality.TABLE;
    
	@Input() dcs: string[] = ['_ck', 'id'];
    @Input() buttons: any[];

	@Output() resultList = new EventEmitter<any[]>();
	@Output() resultCount = new EventEmitter<number>();
	
	@Input() selectedElements: any[] = [];
	@Output() selectedElementsChange = new EventEmitter<any[]>()

	constructor(
        agcs: AgalCommonService
	) { super(agcs); }
	
	loading: boolean = false;

	ds: any[];
	totalRecords: number = 0;

	ngOnInit() {
		if(this.paginator === undefined) {
			this.loadData();
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		let nOfChange = 0;
		for(let change in changes) { nOfChange++ }

		if(nOfChange == 1 && changes['selectedElements'] !== undefined) {
			return;
		}
		if(nOfChange == 1 && changes['dcs'] !== undefined) {
			return;
		}
		this.loadData();
	}

    lazyLoad(event: LazyLoadEvent) {
        if(event.sortField !== undefined && event.sortOrder !== undefined) {
			let sort = [];
			{
				let sortable: string = event.sortField + ',';
				sortable += (event.sortOrder > 0) ? 'asc' : 'desc';
				sort.push(sortable);
			}
			this.sort = sort;
			this.loadData();
			this.sortChange.emit(sort);
        }
    }

	decoreButtons(items: any[], e: any) {
		for(let item of items) {
			item.data = e;
		}
		return items;
	}

	selection(elements: any[]) {
		this.selectedElements = elements;
		this.selectedElementsChange.emit(this.selectedElements);
	}

    async loadData() {
		if(this.loading) {
			return;
		}
		this.loading = true;
		{
			this._apiFilters = { ...this.filters };
			if(this._apiFilters === undefined) {
				this._apiFilters = {};
			}
			if(this.paginator !== undefined) {
				this._apiFilters.page = this.paginator.page;
				this._apiFilters.size = this.paginator.size;
			}
			if(this.sort.length > 0) {
				this._apiFilters.sort = this.sort;
			}
			await this.callApi(this._apiFilters);
			this.emitUpdate();
		}
        this.loading = false;
    }

	protected async callApi(filters: any) { }

	protected emitUpdate() {
		this.resultCount.emit(this.totalRecords);
		this.resultList.emit(this.ds);
	}
}