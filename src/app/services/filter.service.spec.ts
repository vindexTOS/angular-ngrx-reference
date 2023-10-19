import { TestBed } from '@angular/core/testing'

import { FilterService } from './filter.service'
import {
  ActionsSubject,
  ReducerManager,
  StateObservable,
  Store,
  StoreModule,
} from '@ngrx/store'
import { AppModule } from '../app.module'

describe('FilterService', () => {
  let service: FilterService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],

      providers: [
        FilterService,
        Store,
        StateObservable,
        ActionsSubject,
        ReducerManager,
      ],
    })
    service = TestBed.inject(FilterService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should update query correctly', () => {
    service.onValueChangedSortBy('name.raw')
    service.onValueChangeAcenDece('asc')

    expect(service.queryObj.sortBy).toEqual('name.raw')
    expect(service.queryObj.sortDirection).toEqual('asc')
  })

  it('should handle label removal correctly', () => {
    const labelToRemove = 'name'
    service.handleLabelRemoveInclude(labelToRemove)

    expect(service.selectedIncludedLabels).not.toContain(labelToRemove)
    expect(service.includes).not.toContain(labelToRemove)
  })

  it('should handle label excluded removal correctly', () => {
    const labelToRemove = 'name'
    service.handleLabelExcludedRemove(labelToRemove)

    expect(service.selectedExcludedLables).not.toContain(labelToRemove)
    expect(service.excludes).not.toContain(labelToRemove)
  })

  // it('should reset filter correctly', () => {
  //
  //   localStorage.setItem('filterServiceData', 'some data')
  //   service.ResetFilter()

  //
  //   expect(localStorage.getItem('filterServiceData')).toBeNull()
  // })
})
