import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaQVComponent } from './programa-qv.component';

describe('ProgramaQVComponent', () => {
  let component: ProgramaQVComponent;
  let fixture: ComponentFixture<ProgramaQVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramaQVComponent]
    });
    fixture = TestBed.createComponent(ProgramaQVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
