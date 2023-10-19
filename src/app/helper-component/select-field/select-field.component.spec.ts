import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { SelectFieldComponent } from './select-field.component'
import { AppModule } from 'src/app/app.module'

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent
  let fixture: ComponentFixture<SelectFieldComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        declarations: [SelectFieldComponent],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SelectFieldComponent)
          component = fixture.componentInstance
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
