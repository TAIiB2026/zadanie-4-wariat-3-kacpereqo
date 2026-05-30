import { Injectable } from '@angular/core';
import { GetDataInterface } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { Observable, of } from 'rxjs';
import { FilmClass } from './classes/film.class';

@Injectable()
export class RepozytoriumPamiecioweService implements GetDataInterface, FormSubmitInterface {
  private idGenerator = 1;
  private readonly data: FilmClass[] = [
    new FilmClass(this.idGenerator++, "Madagaskar", 10.00, new Date(2005, 4, 25)),
    new FilmClass(this.idGenerator++, "Shrek", 12.50, new Date(2001, 4, 18)),
    new FilmClass(this.idGenerator++, "Epoka Lodowcowa", 11.99, new Date(2002, 2, 15)),
    new FilmClass(this.idGenerator++, "Kung Fu Panda", 14.90, new Date(2008, 5, 6)),
    new FilmClass(this.idGenerator++, "Jak wytresować smoka", 16.50, new Date(2010, 2, 26))
  ]

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const newObj = new FilmClass(this.idGenerator++, nazwa, cena, data);
    this.data.push(newObj);
    return of(true);
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      obj.tytul = nazwa;
      obj.cena = cena;
      obj.dataPremiery = data;
      return of(true);
    }

    return of(false);
  }

  Get(): Observable<FilmClass[]> {
    const kopia = this.data.map(x => new FilmClass(x.id, x.tytul, x.cena, x.dataPremiery));
    return of(kopia);
  }

  GetByID(id: number): Observable<FilmClass> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      const kopia = new FilmClass(obj.id, obj.tytul, obj.cena, obj.dataPremiery);
      return of(kopia);
    }

    throw new Error("Nie znaleziono obiektu.");
  }
}
