import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssainroomstestComponent } from './assainroomstest.component';

describe('AssainroomstestComponent', () => {
  let component: AssainroomstestComponent;
  let fixture: ComponentFixture<AssainroomstestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssainroomstestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssainroomstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
