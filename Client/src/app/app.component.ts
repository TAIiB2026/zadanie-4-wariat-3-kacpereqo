import { Component, inject } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styles: []
})
export class AppComponent {
  private readonly timerService = inject(TimerService);
  public time: number = -1;

  private sub?: Subscription;

  ngOnInit(): void {

    this.start();
  }

  pause() : void{
    this.sub?.unsubscribe();
  }

  start() :void{
    this.timerService.get().subscribe({
      next: (r) => {
        this.time = r;
      },
    })

    this.sub = interval(1000).pipe(
      switchMap(() => this.timerService.get())
    ).subscribe({
      next: (r) => {
        this.time = r;
      },
      error: (err) => {
        this.time = -1;
      }
    });
  }

  ngOnDestroy(): void {
   this.pause();
  }
}
