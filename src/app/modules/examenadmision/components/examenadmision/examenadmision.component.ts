import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ExamenadmisionService } from 'src/app/modules/shared/services/examenadmision.service';
import { FormExamenAdmisionComponent } from './form-examen-admision.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenadmision',
  templateUrl: './examenadmision.component.html',
  styleUrls: ['./examenadmision.component.css']
})
export class ExamenadmisionComponent implements OnInit {
  displayColumns: string[] = ['examenId', 'fechaExamen', 'acciones'];
  dataSource = new MatTableDataSource<ExamenadmisionElement>()

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ExamenadmisionService: ExamenadmisionService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getExamenadmision();
  }
  openFormExamenAdmision() {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Examenes Admision', 'Registro almacenado correctamente', 'success');
        this.getExamenadmision();
      } else if (result == 2) {
        Swal.fire('Examenes Admision', 'Error al Agregar el Registro', 'error');
      }
    })
  }

  getExamenadmision() {
    this.ExamenadmisionService.getExamenadmision().subscribe(data => {
      console.log(data);
      this.processExamenadmisionResponse(data);
    });
  }

  deleteExamenAdmision(examenId: any) {
    Swal.fire({
      title: 'Exámenes Admisión',
      text: '¿Está Segurno de eliminar este examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.ExamenadmisionService.deleteExamenAdmision(examenId).subscribe((data: any) => {
          if (data.httpStatusCode == 500) {
            //Swal.fire('Carreras Técnicas', 'Existe un error al eliminar el registro', 'error');
            Swal.fire('Exámenes Admisión', data.messaje, 'error');
          } else {
            Swal.fire('Exámenes Admisión', 'Registro eliminado', 'success');
            this.getExamenadmision();
          }
        });
      }
    })
  }

  editExamenAdmision(jornadaId: string, fechaExamen: string) {
    const dialogRef = this.dialog.open(FormExamenAdmisionComponent, {
      width: '450px',
      data: { jornadaId: jornadaId, fechaExamen: fechaExamen }
    });
  }

  processExamenadmisionResponse(data: any) {
    const dataExamenadmision: ExamenadmisionElement[] = [];
    let listExamenadmision = data;
    listExamenadmision.forEach((element: ExamenadmisionElement) => {
      dataExamenadmision.push(element);
    })
    this.dataSource = new MatTableDataSource<ExamenadmisionElement>(dataExamenadmision)
    this.dataSource.paginator = this.paginator;
  }
}

export interface ExamenadmisionElement {
  examenId: string,
  fechaExamen: string
}
