import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilComponent } from './contabil.component';

describe('ContabilComponent', () => {
  let component: ContabilComponent;
  let fixture: ComponentFixture<ContabilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContabilComponent]
    });
    fixture = TestBed.createComponent(ContabilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
