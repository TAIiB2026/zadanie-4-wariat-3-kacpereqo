import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FORM_SUBMIT_TOKEN } from '../tokens/form-submit.token';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';

@Component({
  selector: 'taiib2-formularz',
  standalone: false,
  templateUrl: './formularz.component.html',
  styles: ``
})
export class FormularzComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly getDataService = inject(GET_DATA_TOKEN);
  private readonly submitService = inject(FORM_SUBMIT_TOKEN);

  public tytul: string = '';
  public cena: number = 0;
  public data!: string;
  public id?: number;
  public wczytywanie = true;

  private readonly sub = new Subscription();

  constructor() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id != null) {
        const idNumber = parseInt(id);
        if(!isNaN(idNumber)) {
          this.id = idNumber;

          this.getDataService.GetByID(idNumber).subscribe({
            next: res => {
                this.tytul = res.tytul;
                this.cena = res.cena;
                this.ustawDate(res.dataPremiery);
                this.wczytywanie = false;
              }, error: (err) => {
                console.error(err);
                alert("Wystąpił błąd podczas pobierania obiektu.");
              }
            });
        } else {
          this.ustawDate(new Date());
          this.wczytywanie = false;
        }
      } else {
        this.ustawDate(new Date());
        this.wczytywanie = false;
      }
    });
  }

  private ustawDate(data: Date | string): void {
    const d = new Date(data); 
  
    this.data = `${d.getFullYear()}-${
      String(d.getMonth() + 1).padStart(2, '0')
    }-${
      String(d.getDate()).padStart(2, '0')
    }`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSubmit() {
    this.wczytywanie = true;
    console.log(this.data)
    let request: Observable<boolean>;

    const [year, month, day] = this.data.split('-').map(Number);
    const data: Date = new Date(year, month - 1, day);

    if(this.id != null && this.id > 0) {
      request = this.submitService.Put(this.id, this.tytul, this.cena, data);
    } else {
      request = this.submitService.Post(this.tytul, this.cena, data);
    }

    request.subscribe({next: (res) => {
      if(res) {
        this.router.navigateByUrl("/filmy");
      } else {
        alert("Wystąpił błąd podczas próby zapisu zmian.");
        this.wczytywanie = false;
      }
    }, error: (err) => {
      alert("Wystąpił błąd podczas próby zapisu zmian.");
        this.wczytywanie = false;
    }})
  }
}
