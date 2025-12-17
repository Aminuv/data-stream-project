import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroyRef = inject(DestroyRef)
  interval = signal(0);
  clickCount = signal(0);
  doubleInterval = computed(() => this.interval() * 2)
  clickCount$ = toObservable(this.clickCount)
  ngOnInit(): void {
    /*setInterval(() => {
      this.interval.update(prevIntervalNumber => prevIntervalNumber + 1 )
    }, 1000);

    const subscription = interval(1000).pipe(
      map((val) => val  * 2)
    ).
    subscribe({
     next: (val) => console.log(val)
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    */
   const subscription = this.clickCount$.subscribe({
    next: (val) => console.log(`Click button ${this.clickCount()} times.`)
   });
     this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  constructor() {
    effect(() => {
     console.log(`Click button ${this.clickCount()} times.`)
     });

  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }

}
