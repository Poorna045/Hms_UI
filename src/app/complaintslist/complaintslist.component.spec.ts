import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintslistComponent } from './complaintslist.component';

describe('ComplaintslistComponent', () => {
  let component: ComplaintslistComponent;
  let fixture: ComponentFixture<ComplaintslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
