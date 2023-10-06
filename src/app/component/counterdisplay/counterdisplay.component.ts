import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { ChangeDetectorRef } from '@angular/core'
import { counterModel } from 'src/app/shared/store/counter.state'
import { getcounter } from 'src/app/shared/store/counter.selector'

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.css'],
})
export class CounterdisplayComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ counter: counterModel }>,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
  ) {}

  counterDisplay!: number
  private counterSubscription: Subscription | undefined
  channelname = ''
  countersubscribe!: Subscription

  counter$!: Observable<counterModel>
  ngOnInit(): void {
    this.counterSubscription = this.store
      .select(getcounter)
      .subscribe((data) => {
        this.counterDisplay = data

        console.log(`Counter value changed to: ${data}`)
        // Manually trigger change detection
      })
    // this.counter$ = this.store.select('counter')
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe()
    }
  }
}
