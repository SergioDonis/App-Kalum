import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenadmisionComponent } from './components/examenadmision/examenadmision.component';
import { FormExamenAdmisionComponent } from './components/examenadmision/form-examen-admision.component';



@NgModule({
  declarations: [
    ExamenadmisionComponent,
    FormExamenAdmisionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ExamenadmisionModule { }
