import { Component, inject } from '@angular/core';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';

@Component({
  selector: 'taiib2-filmy',
  standalone: false,
  templateUrl: './filmy.component.html',
  styles: ``
})
export class FilmyComponent {
  private readonly service = inject(GET_DATA_TOKEN);
  public data$ = this.service.Get();

  onDeleteButtonClick(id: number) {
    this.service.Delete(id).subscribe({
      next: (success) => {
        if (success) {
          this.data$ = this.service.Get();
        }
      },
      error: (err) => console.error(err)
    });
  } 

  filterTytul: string = '';
  start: number = 0;
  limit: number = 3;


  odswiez() {
    this.data$ = this.service.Get(this.filterTytul, this.start, this.limit);
  }

  nastepnaStrona() {
    this.start += this.limit;
    this.odswiez();
  }

  poprzedniaStrona() {
    if (this.start > 0) {
      this.start = Math.max(0, this.start - this.limit);
      this.odswiez();
    }
  }

  onSearchChange() {
    this.start = 0; 
    this.odswiez();
  }
}
