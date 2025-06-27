import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaixeComponent } from './encaixe.component';

describe('EncaixeComponent', () => {
  let component: EncaixeComponent;
  let fixture: ComponentFixture<EncaixeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncaixeComponent]
    });
    fixture = TestBed.createComponent(EncaixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
