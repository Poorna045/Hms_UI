import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancepaymentComponent } from './maintenancepayment.component';

describe('MaintenancepaymentComponent', () => {
  let component: MaintenancepaymentComponent;
  let fixture: ComponentFixture<MaintenancepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
