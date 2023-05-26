import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamenadmisionService } from 'src/app/modules/shared/services/examenadmision.service';

@Component({
  selector: 'app-form-examen-admision',
  templateUrl: './form-examen-admision.component.html',
  styleUrls: ['./form-examen-admision.component.css']
})
export class FormExamenAdmisionComponent {
  public examenAdmisionForm: FormGroup;
  estadoFormulario; string = 'Agregar';

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<FormExamenAdmisionComponent>,
    private examenAdmisionService: ExamenadmisionService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.examenAdmisionForm = this.fb.group({
      fechaExamen: ['', Validators.required]
    })
    if (data != null) {
      this.estadoFormulario = 'Actualizar';
      this.updateForm(data);
    }
  }

  updateForm(data: any) {
    this.examenAdmisionForm = this.fb.group({
      examenAdmision: [data.fechaExamen, Validators.required]
    });
  }

  onSave() {
    let data = {
      examenId: "xxxxxx",  //this.examenAdmisionForm.get('examenAdmision')?.value    
      fechaExamen: this.examenAdmisionForm.get('fechaExamen')?.value
    }
    console.log(data);
    if (data != null) {
      this.examenAdmisionService.saveExamenAdmision(data).subscribe(response => {
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
