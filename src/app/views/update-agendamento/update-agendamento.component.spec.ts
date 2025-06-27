import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgendamentoComponent } from './update-agendamento.component';

describe('UpdateAgengamentoComponent', () => {
  let component: UpdateAgendamentoComponent;
  let fixture: ComponentFixture<UpdateAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAgendamentoComponent]
    });
    fixture = TestBed.createComponent(UpdateAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
