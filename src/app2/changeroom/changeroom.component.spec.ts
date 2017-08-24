import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeroomComponent } from './changeroom.component';

describe('ChangeroomComponent', () => {
  let component: ChangeroomComponent;
  let fixture: ComponentFixture<ChangeroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
