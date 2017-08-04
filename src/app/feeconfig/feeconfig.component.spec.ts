import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeconfigComponent } from './feeconfig.component';

describe('FeeconfigComponent', () => {
  let component: FeeconfigComponent;
  let fixture: ComponentFixture<FeeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
