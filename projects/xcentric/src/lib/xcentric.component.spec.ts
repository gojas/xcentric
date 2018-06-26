import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XcentricComponent } from './xcentric.component';

describe('XcentricComponent', () => {
  let component: XcentricComponent;
  let fixture: ComponentFixture<XcentricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XcentricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XcentricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
