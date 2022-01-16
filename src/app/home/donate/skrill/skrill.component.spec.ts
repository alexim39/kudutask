import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkrillComponent } from './skrill.component';

describe('SkrillComponent', () => {
  let component: SkrillComponent;
  let fixture: ComponentFixture<SkrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
