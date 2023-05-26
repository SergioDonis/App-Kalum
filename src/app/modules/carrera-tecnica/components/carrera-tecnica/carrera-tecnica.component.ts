import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { FormCarreraTecnicaComponent } from './form-carrera-tecnica.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrera-tecnica',
  templateUrl: './carrera-tecnica.component.html',
  styleUrls: ['./carrera-tecnica.component.css']
})
export class CarreraTecnicaComponent implements OnInit {
  displayColumns: string[] = ['number', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<CarreraTecnicaElement>()

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private carreraTecnicaService: CarreraTecnicaService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCarrerasTecnicas();
  }
  openFormCarreraTecnica() {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Carreras Técnicas', 'Que Pilas vos!!! Registro almacenado correctamente', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Ijuela vos!!! Error al Agregar el Registro', 'error');
      }
    })
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarrerasTecnicas().subscribe(data => {
      console.log(data);
      this.processCarreraTecnicaResponse(data);
    });
  }

  deleteCarreraTecnica(carreraId: any) {
    Swal.fire({
      title: 'Carreras técnicas',
      text: '¿Está Segurno de eliminar esta carrera técnica?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.carreraTecnicaService.deleteCarreraTecnica(carreraId).subscribe((data: any) => {
          if (data.httpStatusCode == 500) {
            //Swal.fire('Carreras Técnicas', 'Existe un error al eliminar el registro', 'error');
            Swal.fire('Carreras Técnicas', data.messaje, 'error');
          } else {
            Swal.fire('Carreras Técnicas', 'Tronitos vos!!! Registro eliminado', 'success');
            this.getCarrerasTecnicas();
          }
        });
      }
    })
  }

  editCarreraTecnica(carreraId: string, nombre: string) {
    const dialogRef = this.dialog.open(FormCarreraTecnicaComponent, {
      width: '450px',
      data: { carreraId: carreraId, nombre: nombre }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        Swal.fire('Carreras Técnicas', 'Que Pilas vos!!! registro almacenado correctamente', 'success');
        this.getCarrerasTecnicas();
      } else if (result == 2) {
        Swal.fire('Carreras Técnicas', 'Ijuela vos!!! se generó un error al modificar el registro', 'error');
      }
    })
  }

  processCarreraTecnicaResponse(data: any) {
    const dataCarreraTecnica: CarreraTecnicaElement[] = [];
    let listCarreraTecnica = data;
    let number = 1;
    listCarreraTecnica.forEach((element: CarreraTecnicaElement) => {
      element.number = number;
      dataCarreraTecnica.push(element);
      number++;
    })
    this.dataSource = new MatTableDataSource<CarreraTecnicaElement>(dataCarreraTecnica)
    this.dataSource.paginator = this.paginator;
  }
}

export interface CarreraTecnicaElement {
  number: number,
  carreraId: string,
  nombre: string
}
