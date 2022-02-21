import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  // Base del URL
  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams(){
    return new HttpParams().set('fields','name,capital,alpha2Code,flag,population');
    
  }

  constructor
    (
      private http: HttpClient
    ) { }

  // De tipo Country
  buscarPais(termino: string): Observable<any> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<any>(url, {params : this.httpParams});
    // .pipe(
    //   catchError(err=>of([]))
    // );
  }


  buscarCapital(termino: string): Observable<any> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<any>(url, {params : this.httpParams});
    // .pipe(
    //   catchError(err=>of([]))
    // );
  }

  getPaisPorAlpha(id: string): Observable<any> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<any>(url);
    // .pipe(
    //   catchError(err=>of([]))
    // );
  }

  buscarRegion(id : string) : Observable<any>{

    const url = `${this.apiUrl}/regionalbloc/${id}`;
    return this.http.get<any>(url,{params : this.httpParams})
    .pipe(
      tap(console.log)
    ) ;
  }

}
