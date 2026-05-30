import { Observable } from "rxjs";
import { FilmClass } from "../classes/film.class";

export interface GetDataInterface {
    Get(): Observable<FilmClass[]>;
    GetByID(id: number): Observable<FilmClass>;
}