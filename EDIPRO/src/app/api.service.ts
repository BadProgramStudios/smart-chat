import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para realizar la solicitud GET
  getDatos(): Observable<any> {
    const url = `${this.apiUrl}`; // Reemplaza 'datos' con tu ruta de API
    return this.http.get(url);
  }

  sedQuestion(promt:string){
    console.log("este es el promt:");
    console.log(promt);
    return this.http.post(environment.baseUrl, { promt });
  }

    
}
