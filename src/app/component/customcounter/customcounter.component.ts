import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { customincrement } from 'src/app/shared/store/counter.actions'
import { getchannelname } from 'src/app/shared/store/counter.selector'
import { counterModel } from 'src/app/shared/store/counter.state'
@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css'],
})
export class CustomcounterComponent implements OnInit {
  constructor(private store: Store<{ counter: counterModel }>) {}
  private counterSubscription: Subscription | undefined

  channelname = ''
  counsterinput!: number
  actiontype: string = 'add'
  OnIncrement() {
    this.store.dispatch(
      customincrement({
        value: Number(this.counsterinput),
        action: this.actiontype,
      }),
    )
  }

  ngOnInit(): void {
    this.counterSubscription = this.store
      .select(getchannelname)
      .subscribe((data) => {
        this.channelname = data
        console.log('Custom Counter')
      })
  }
}
