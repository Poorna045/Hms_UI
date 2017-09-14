import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelerslistComponent } from './hostelerslist.component';

describe('HostelerslistComponent', () => {
  let component: HostelerslistComponent;
  let fixture: ComponentFixture<HostelerslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelerslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
