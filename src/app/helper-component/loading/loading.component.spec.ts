import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { LoadingComponent } from './loading.component'
import { AppModule } from 'src/app/app.module'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent],
        imports: [AppModule],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LoadingComponent)
          component = fixture.componentInstance
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
