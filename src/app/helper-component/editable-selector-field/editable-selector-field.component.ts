import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-editable-selector-field',
  templateUrl: './editable-selector-field.component.html',
  styleUrls: ['./editable-selector-field.component.css'],
})
export class EditableSelectorFieldComponent {
  @Input() value: string = ''
  @Input() isFilter: boolean = true
  @Input() placeholder: string = ''
  @Input() isEditMode: boolean = false
  @Input() isDataSelector: string = 'input' // or 'selector'
  @Input() selectOptions: any[] = []

  @Output() valueChanged = new EventEmitter<string>()

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const newValue = inputElement.value
    this.valueChanged.emit(newValue)
  }

  onSelectionChange(event: any) {
    this.value = event.value
    this.valueChanged.emit(this.value)
  }
  emitValueChanged() {
    this.valueChanged.emit(this.value)
  }

  // onValueChanged({property, newValue}:{property: string, newValue: string}) {
  //   this.valueChanged.emit({ property, value: newValue });
  // }
}
