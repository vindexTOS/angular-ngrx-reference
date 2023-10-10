import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccsessComponent } from './succsess.component';

describe('SuccsessComponent', () => {
  let component: SuccsessComponent;
  let fixture: ComponentFixture<SuccsessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccsessComponent]
    });
    fixture = TestBed.createComponent(SuccsessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
