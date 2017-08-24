import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudregisComponent } from './studregis.component';

describe('StudregisComponent', () => {
  let component: StudregisComponent;
  let fixture: ComponentFixture<StudregisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudregisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudregisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
