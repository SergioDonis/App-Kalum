import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CarreraTecnicaService {

  constructor(private http: HttpClient) { }

  getCarrerasTecnicas() {
    return this.http.get(`${base_url}/carreras-tecnica`)
  }

  saveCarreraTecnica(body: any) {
    return this.http.post(`${base_url}/carreras-tecnica`, body);
  }

  deleteCarreraTecnica(id: any){
    const endPoint = `${base_url}/carreras-tecnica/${id}`;
    return this.http.delete(endPoint);

  }

  updateCarreraTecnica(body:any, id: any){
    const endPoint = `${base_url}/carreras-tecnica/${id}`;
    return this.http.put(endPoint,body);

  }
  
}
