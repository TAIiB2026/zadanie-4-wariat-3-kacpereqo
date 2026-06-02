import { Observable } from "rxjs";
import { FilmClass } from "../classes/film.class";

export interface GetDataInterface {
    Get(tytul?: string, start?: number, limit?: number): Observable<FilmClass[]>;
    GetByID(id: number): Observable<FilmClass>;
    Delete(id:number): Observable<boolean>;
}