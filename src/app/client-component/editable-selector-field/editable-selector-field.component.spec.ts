import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSelectorFieldComponent } from './editable-selector-field.component';

describe('EditableSelectorFieldComponent', () => {
  let component: EditableSelectorFieldComponent;
  let fixture: ComponentFixture<EditableSelectorFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditableSelectorFieldComponent]
    });
    fixture = TestBed.createComponent(EditableSelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
