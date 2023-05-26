import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExamenadmisionService {

  constructor(private http: HttpClient) { }

  getExamenadmision(){
    return this.http.get(`${base_url}/examen-admision`)
  }

  saveExamenAdmision(body: any) {
    return this.http.post(`${base_url}/examen-admision`, body);
  }

  deleteExamenAdmision(id: any){
    const endPoint = `${base_url}/examen-admision/${id}`;
    return this.http.delete(endPoint);

  }

  updateExamenAdmision(body:any, id: any){
    const endPoint = `${base_url}/examen-admision/${id}`;
    return this.http.put(endPoint,body);

  }

}
