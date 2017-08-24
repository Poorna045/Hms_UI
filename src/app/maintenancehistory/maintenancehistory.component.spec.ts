import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancehistoryComponent } from './maintenancehistory.component';

describe('MaintenancehistoryComponent', () => {
  let component: MaintenancehistoryComponent;
  let fixture: ComponentFixture<MaintenancehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
