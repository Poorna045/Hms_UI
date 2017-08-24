import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignroomsComponent } from './assignrooms.component';

describe('AssignroomsComponent', () => {
  let component: AssignroomsComponent;
  let fixture: ComponentFixture<AssignroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
