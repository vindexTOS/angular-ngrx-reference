import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-succsess',
  templateUrl: './succsess.component.html',
  styleUrls: ['./succsess.component.css'],
})
export class SuccsessComponent {
  @Input() childData?: string
}
