import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsconfigComponent } from './roomsconfig.component';

describe('RoomsconfigComponent', () => {
  let component: RoomsconfigComponent;
  let fixture: ComponentFixture<RoomsconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
