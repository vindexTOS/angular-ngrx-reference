import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-form-drawer',
  templateUrl: './form-drawer.component.html',
  styleUrls: ['./form-drawer.component.css'],
})
export class FormDrawerComponent {
  @Input() show!: boolean
}
