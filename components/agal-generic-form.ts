import { Directive, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";
import { AgalCommonService } from "../services/common.service";
import { AgalGenericComponent } from "./agal-generic-component";

export enum FormStep {
	FORM, LOADING, COMPLETE
}

@Directive()
export abstract class AgalGenericForm extends AgalGenericComponent {
	@Input() returnToParent: boolean = false;
	input: any;
	output: EventEmitter<any>;

	constructor(
		agcs: AgalCommonService,
	) { super(agcs); }

	private step: FormStep = FormStep.FORM;
	public formStep = FormStep;

	protected _isUpdate: boolean = false;
	protected _newUpdateForm: FormGroup;
	protected _result: any;

	override init(): void {
		this.loadVariables();
		this.loadForm();
		this.precompileForm();
	}

	protected loadVariables() { };
	protected loadForm() { };

	private precompileForm() {
		if(this.input != null && this.input.id != null) {
			this._newUpdateForm.patchValue(this.input);
			this._isUpdate = true;
		}
	};

	protected setStep(step: FormStep) {
		this.step = step;
		switch (step) {
			case FormStep.LOADING: this.agcs.eventer.loadingStart(); break;
			default: this.agcs.eventer.loadingEnd(); break;
		}
	}

	stepIs(step: FormStep) {
		if(step === this.step) {
			return true;
		}
		return false;
	}

	submit() {
		if (!this._newUpdateForm.valid) {
			this._newUpdateForm.markAllAsTouched();
			for(let controlName in this._newUpdateForm.controls) {
				let control: AbstractControl = this._newUpdateForm.controls[controlName];
				control.markAsDirty();
			}
			return;
		}
		this.setStep(FormStep.LOADING);

		let formResult = this.prepareResult();

		if(this.returnToParent) {
			this.output.emit(formResult);
			this.setStep(FormStep.COMPLETE);
			return;
		}

		if(!this.returnToParent) {
			this.sendToBackEnd(formResult);
			return;
		}
	}

	isValid(control: AbstractControl): boolean {
		if(control.invalid && control.dirty) return false;
		return true;
	}

	checkControlError(control: AbstractControl, error: string): boolean {
		if(control.errors != null && control.errors[error] != null) return true;
		return false;
	}

	protected prepareResult() { }
	protected async sendToBackEnd(request: any) {}
}