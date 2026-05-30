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
  public readonly data$ = this.service.Get();
}
