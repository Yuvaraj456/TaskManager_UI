import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { ProjectidUniqueValidatorDirective } from '../directives/projectid-unique-validator.directive';
import { NumberToWordsPipe } from '../pipes/number-to-words.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';
import { SortPipe } from '../pipes/sort.pipe';



@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectidUniqueValidatorDirective,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ComponentLoaderDirective,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentLoaderDirective,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectidUniqueValidatorDirective,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    SortPipe
  ]
})
export class SharedModule { }
