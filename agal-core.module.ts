import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

import { AgalCommonService } from './services/common.service';
import { AgalPaginatorComponent } from './modules/paginator/components/paginator/paginator.component';
import { AgalAutocompleteComponent } from './modules/autocomplete/components/autocomplete/autocomplete.component';
import { AgalAutocompleteDirective } from './modules/autocomplete/directives/agal-autocomplete.directive';

import { AgalEventerModule } from './modules/eventer/eventer.module';

@NgModule({
	imports: [
		CommonModule,
		/* add this 2 imports only in app module
		BrowserModule,
		HttpClientModule,
		*/
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,

		DropdownModule,

		AgalEventerModule,

	],
	providers: [
		AgalCommonService,
	],
	declarations: [
		AgalPaginatorComponent,
		AgalAutocompleteComponent,

		AgalAutocompleteDirective,

	],
	exports: [
		CommonModule,
		FlexLayoutModule,

		FormsModule,
		ReactiveFormsModule,

		TableModule,
		ButtonModule,
		MenuModule,
		RippleModule,
		CardModule,

		AgalPaginatorComponent,
		AgalAutocompleteComponent,

		AgalAutocompleteDirective,

		AgalEventerModule,

	]
})
export class AgalCoreModule { }