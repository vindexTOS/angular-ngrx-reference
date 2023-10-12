import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-editable-field',
  template: `
    <ng-container *ngIf="!isEditMode; else editField">
      {{ value }}
    </ng-container>
    <ng-template #editField>
      <input
        [value]="value"
        [placeholder]="placeholder"
        (input)="onInputChange($event)"
      />
    </ng-template>
  `,
})
export class EditableFieldComponent {
  @Input() value: string = ''
  @Input() placeholder: string = ''
  @Input() isEditMode: boolean = false
  editedValue: string = ''

  @Output() valueChanged = new EventEmitter<string>()

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.value = inputElement.value
    this.valueChanged.emit(this.value)
  }
}
