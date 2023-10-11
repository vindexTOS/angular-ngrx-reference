import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { FilterService } from 'src/app/services/filter.service'

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css'],
})
export class SelectFieldComponent {
  @Input() labels: string[] = []
  @Input() refrenceLabels: any[] = []
  @Input() label: string = 'Labels'

  @Output() labelSelect = new EventEmitter<any>()
  @Output() removeLabel = new EventEmitter<any>()

  exampleForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.exampleForm = this.formBuilder.group({
      selectedLabel: [],
    })
  }

  onLabelSelect(event: any) {
    this.labelSelect.emit(event) // Emit the event when a label is selected
  }

  remove(label: any) {
    this.removeLabel.emit(label) // Emit the label to be removed
  }
}
