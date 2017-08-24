import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilltypesComponent } from './billtypes.component';

describe('BilltypesComponent', () => {
  let component: BilltypesComponent;
  let fixture: ComponentFixture<BilltypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilltypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilltypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
