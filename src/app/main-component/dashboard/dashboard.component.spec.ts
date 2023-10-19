import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
} from '@angular/core/testing'

import { DashboardComponent } from './dashboard.component'
import { FilterService } from 'src/app/services/filter.service'
import {
  ActionsSubject,
  ReducerManager,
  ReducerManagerDispatcher,
  StateObservable,
  Store,
  StoreModule,
} from '@ngrx/store'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { SelectFieldComponent } from 'src/app/helper-component/select-field/select-field.component'
import { EditableSelectorFieldComponent } from 'src/app/helper-component/editable-selector-field/editable-selector-field.component'
import { AppModule } from 'src/app/app.module'
describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let filterService: FilterService
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardComponent],
        imports: [AppModule],
        providers: [
          ActionsSubject,
          ReducerManager,
          ReducerManagerDispatcher,
          StateObservable,
          Store,
          StoreModule,
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(DashboardComponent)
          component = fixture.componentInstance

          filterService = TestBed.inject(FilterService)
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should handle label removal from include', () => {
    const label = 'testLabel'
    component.handleLabelRemoveInclude(label)
    expect(component.selectedIncludedLabels).not.toContain(label)
    expect(filterService.selectedIncludedLabels).not.toContain(label)
  })

  it('should handle label removal from excluded', () => {
    const label = 'testLabel'
    component.handleLabelExcludedRemove(label)
    expect(component.selectedExcludedLables).not.toContain(label)
    expect(filterService.selectedExcludedLables).not.toContain(label)
  })

  it('should update sort by value', () => {
    const newValue = 'name.raw'
    component.onValueChangedSortBy(newValue)
    expect(component.sortByValue).toBe(newValue)
  })

  it('should update sort direction value', () => {
    const newValue = 'asc'
    component.onValueChangeAcenDece(newValue)
    expect(component.sortDirectionValue).toBe(newValue)
  })

  // it('should reset filters', () => {
  //   const localStorageSpy = spyOn(localStorage, 'removeItem')

  //   component.ResetFilter()
  //   expect(localStorageSpy).toHaveBeenCalledWith('filterServiceData')
  // })
})
