import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { BannerListComponent } from './banner-list.component'
import { Store } from '@ngrx/store'
import { AppModule } from 'src/app/app.module'

describe('BannerListComponent', () => {
  let component: BannerListComponent
  let fixture: ComponentFixture<BannerListComponent>
  let store: Store
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule],
        declarations: [BannerListComponent],
        providers: [Store],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(BannerListComponent)
          component = fixture.componentInstance
          store = TestBed.inject(Store)
        })
    }),
  )

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should save data to local storage', () => {
    const dataToSave = {
      pageIndex: 1,
      pageSize: 10,
    }
    component.pageIndex = dataToSave.pageIndex
    component.pageSize = dataToSave.pageSize

    component.saveDataToLocalStorage()

    const savedData = localStorage.getItem('pagination')
    const parsedData = JSON.parse(savedData || '{}')
    expect(parsedData.pageIndex).toBe(dataToSave.pageIndex)
    expect(parsedData.pageSize).toBe(dataToSave.pageSize)
  })

  it('should handle page change', () => {
    const event = { pageIndex: 2, pageSize: 20 }
    component.onPageChange(event)

    expect(component.pageIndex).toBe(event.pageIndex)
    expect(component.pageSize).toBe(event.pageSize)
  })

  it('should add a label to labelDefault', () => {
    const label = {
      id: '1',
      typeId: '2',
      key: 'labelKey',
      name: 'Label1',
      sortIndex: 0,
      system: 'system',
    }
    component.labelAdd(label)

    expect(component.labelDefault).toContain(label)
  })

  it('should remove a label from labelDefault', () => {
    const labelToRemove = { name: 'Label1' }
    component.labelDefault = [labelToRemove, { name: 'Label2' }]

    component.labelRemove(labelToRemove)

    expect(component.labelDefault).not.toContain(labelToRemove)
  })
})
