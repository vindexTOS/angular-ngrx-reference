import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditableSelectorFieldComponent } from './editable-selector-field.component'

describe('EditableSelectorFieldComponent', () => {
  let component: EditableSelectorFieldComponent
  let fixture: ComponentFixture<EditableSelectorFieldComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableSelectorFieldComponent],
    })
    fixture = TestBed.createComponent(EditableSelectorFieldComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should emit value when onInputChange is called', () => {
    const newValue = 'New Value'
    spyOn(component.valueChanged, 'emit')

    const fakeEvent = ({
      target: {
        value: newValue,
      },
    } as unknown) as Event

    component.onInputChange(fakeEvent)
    expect(component.valueChanged.emit).toHaveBeenCalledWith(newValue)
  })

  it('should emit value when onSelectionChange is called', () => {
    const newValue = 'New Value'
    spyOn(component.valueChanged, 'emit')
    component.onSelectionChange({ value: newValue })
    expect(component.valueChanged.emit).toHaveBeenCalledWith(newValue)
    expect(component.value).toEqual(newValue)
  })

  it('should emit current value when emitValueChanged is called', () => {
    const currentValue = 'Current Value'
    spyOn(component.valueChanged, 'emit')
    component.value = currentValue
    component.emitValueChanged()
    expect(component.valueChanged.emit).toHaveBeenCalledWith(currentValue)
  })
})
