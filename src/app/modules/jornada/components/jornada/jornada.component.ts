import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { FormJornadaComponent } from './form-jornada.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  displayColumns: string[] = ['jornadaId', 'nombreCorto', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<JornadaElement>()

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private JornadaService: JornadaService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getJornadas();
  }

  openFormJornadas() {
    const dialogRef = this.dialog.open(FormJornadaComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Jornadas', 'Registro almacenado correctamente', 'success');
        this.getJornadas();
      } else if (result == 2) {
        Swal.fire('Jornadas', 'Error al Agregar el Registro', 'error');
      }
    })
  }



  getJornadas() {
    this.JornadaService.getJornadas().subscribe(data => {
      console.log(data);
      this.processJornadasResponse(data);
    });
  }

  deleteJornada(jornadaId: any) {
    Swal.fire({
      title: 'Jornadas',
      text: '¿Está Segurno de eliminar esta jornada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.JornadaService.deleteJornada(jornadaId).subscribe((data: any) => {
          if (data.httpStatusCode == 500) {
            //Swal.fire('Carreras Técnicas', 'Existe un error al eliminar el registro', 'error');
            Swal.fire('Jornadas', data.messaje, 'error');
          } else {
            Swal.fire('Jornadas', 'Registro eliminado', 'success');
            this.getJornadas();
          }
        });
      }
    })
  }

  editJornada(jornadaId: string, descripcion: string) {
    const dialogRef = this.dialog.open(FormJornadaComponent, {
      width: '450px',
      data: { jornadaId: jornadaId, descripcion: descripcion }
    });
  }

  processJornadasResponse(data: any) {
    const dataJornada: JornadaElement[] = [];
    let listJornada = data;
    listJornada.forEach((element: JornadaElement) => {
      dataJornada.push(element);
    })
    this.dataSource = new MatTableDataSource<JornadaElement>(dataJornada)
    this.dataSource.paginator = this.paginator;
  }
}

export interface JornadaElement {
  jornadaId: string,
  nombreCorto: string,
  descripcion: string
}
