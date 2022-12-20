import { AgalAutocompleteComponent } from '@agal-core/modules/autocomplete/components/autocomplete/autocomplete.component';
import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, SimpleChange } from '@angular/core';
import { FormControlName, FormGroup, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
	selector: '[agalAutocomplete]'
})
export class AgalAutocompleteDirective implements OnInit, OnDestroy {
	@Input() agalAutocomplete: AgalAutocompleteComponent;

	@Input() displayFn: Function = (selectedElement: any) => {
		return selectedElement.description;
	};

	constructor(
		private el: ElementRef,
		private ngControl: NgControl,
	) { }

	destroyer: Subscription[] = [];

	ngOnInit() {
		// Prepare variables
		let inputElement: HTMLInputElement = this.el.nativeElement;

		let form: FormGroup;
		let controlName: string;
		{
			let formControlName: any = this.ngControl;
			form = formControlName._parent.form;
			controlName = formControlName.name;
		}

		// On start
		if (form.value[controlName] !== undefined) {
			if (form.value[controlName] != null) {
				inputElement.value = this.displayFn(form.value[controlName]);
			}
		}

		// On Edit event
		this.destroyer.push(this.agalAutocomplete.selectedElementObservable.subscribe(
			(selectedElement) => {
				{
					let patch: any = {};
					patch[controlName] = selectedElement;
					form.patchValue(patch);
				}
				inputElement.value = this.displayFn(selectedElement);
			}
		));
	}

	@HostListener('focus', ['$event']) onFocus(e: any) {
		this.agalAutocomplete.showOptions(true);
	}

	@HostListener('focusout', ['$event']) onFocusOut(e: any) {
		setTimeout(() => {
			this.agalAutocomplete.showOptions(false);
		}, 200);
	}

	ngOnDestroy() {
		this.destroyer.forEach(s => s.unsubscribe());
	}
}