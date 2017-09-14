import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelconfigComponent } from './hostelconfig.component';

describe('HostelconfigComponent', () => {
  let component: HostelconfigComponent;
  let fixture: ComponentFixture<HostelconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
