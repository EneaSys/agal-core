import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'agal-autocomplete',
    templateUrl: 'autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']    
})

export class AgalAutocompleteComponent {
    @Input() filteredElements: Observable<any[]>;
    @Input() input: HTMLInputElement;

    @Input() displayFn: Function = (selectedElement: any) => {
        return selectedElement.description;
    };

    selectedElementObservable: Observable<any>;
    private selectedElement$ = new Subject<any>();
    protected show: boolean = false;
    
    constructor() {
        this.selectedElementObservable = this.selectedElement$.asObservable();
    }

    select(e: any) {
        this.selectedElement$.next(e);
	}

    showOptions(show: boolean) {
        this.show = show;
    }
}