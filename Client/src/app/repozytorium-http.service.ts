import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { GetDataInterface } from './interfaces/get-data.interface';
import { Observable, map } from 'rxjs';
import { FilmClass } from './classes/film.class';

@Injectable({
  providedIn: 'root'
})
export class RepozytoriumHttpService implements GetDataInterface, FormSubmitInterface {



  private readonly URL = 'http://localhost:5114/api/Films';
  private readonly httpClient = inject(HttpClient);

  Get(tytul?: string, start?: number, limit?: number): Observable<FilmClass[]> {
    let params = new HttpParams();
  
    if (tytul) 
      params = params.set('tytul', tytul);
    
    if (start !== undefined) 
      params = params.set('start', start.toString());
  
    if (limit !== undefined) 
      params = params.set('limit', limit.toString());
  
    return this.httpClient.get<FilmClass[]>(this.URL, { params });
  }

  GetByID(id: number): Observable<FilmClass> {
    return this.Get().pipe(
      map(filmy => {
        const znaleziony = filmy.find(f => f.id === id);
        if (!znaleziony) {
          throw new Error(`nie ma`);
        }
        return znaleziony;
      })
    );
  }

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const nowyFilm = new FilmClass(0, nazwa, cena, data);
    
    return this.httpClient.post(this.URL, nowyFilm).pipe(
      map(() => true)
    );
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const zaktualizowanyFilm = new FilmClass(id, nazwa, cena, data);
    
    return this.httpClient.put(`${this.URL}/${id}`, zaktualizowanyFilm).pipe(
      map(() => true)
    );
  }

  Delete(id: number): Observable<boolean> {
    console.log(`deleting ${id}`)
    return this.httpClient.delete(`${this.URL}/${id}`).pipe(
      map(() => true)
    );  }
}