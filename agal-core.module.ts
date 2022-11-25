import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

import { AgalCommonService } from './services/common.service';
import { AgalPaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		HttpClientModule,

		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,

		DropdownModule,
	],
	providers: [
		AgalCommonService,
	],
	declarations: [
		AgalPaginatorComponent,
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
	]
})
export class AgalCoreModule { }