import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';

@Component({
  selector: 'app-form-jornada',
  templateUrl: './form-jornada.component.html',
  styleUrls: ['./form-jornada.component.css']
})
export class FormJornadaComponent {
  public jornadaForm: FormGroup;
  estadoFormulario; string = 'Agregar';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormJornadaComponent>,
    private jornadaService: JornadaService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.jornadaForm = this.fb.group({
      nombreCorto: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.jornadaForm = this.fb.group({
      jornada: [data.jornadaId, data.descripcion, Validators.required]
    });
  }

  onSave() {
    let data = {
      jornadaId: "xxxxxx",
      nombreCorto: this.jornadaForm.get('nombreCorto')?.value,
      descripcion: this.jornadaForm.get('descripcion')?.value
    }
    console.log(data);
    if (data != null) {
      this.jornadaService.saveJornada(data).subscribe(response => {
        console.log(response);
        this, this.dialogRef.close(1);
      }, (error) => {
        console.log(error);
        this.dialogRef.close(3);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

}
