import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agendamento } from 'src/app/models/agendamento';
import { AuthUsuarioService } from 'src/app/services/usuario/auth.usuario.service';

interface Prestadores {
  value: string;
  viewValue: string;
}

interface Horarios {
  horario: string;
  viewValue: string;
}

interface Atendimento {
  value: string;
}

export interface Agenda {
  crm: number;
  hora: string;
  nome_medico: string;
  prestador: string;
  telefone: string,
  atendimento: string;
  observacao: string;
}

@Component({
  selector: 'app-encaixe',
  templateUrl: './encaixe.component.html',
  styleUrls: ['./encaixe.component.css']
})
export class EncaixeComponent {

  selected?: Date;
  openDialog: boolean = true;

  prestador_select: String | undefined;
  procedimento_select: String | undefined;

  @Input() agenda!: Agendamento;

  agendaForm!: FormGroup;

  prestadores: Prestadores[] = [
    { value: 'FULANO', viewValue: 'FULANO' },
    { value: 'FULANO', viewValue: 'FULANO FULANO' },
    { value: 'FULANO', viewValue: 'FULANO FULANO' },
    { value: 'FULANO', viewValue: 'FULANO FULANO' },
    { value: 'FULANO', viewValue: 'FULANO FULANO' },
    { value: 'GlFULANOausiiev', viewValue: 'FULANO FULANO' },
  ];

  atendimento: Atendimento[] = [
    { value: 'Presencial'},
    { value: 'Online'},
    { value: 'Por Telefone' }
  ];

  procedimento: Atendimento[] = [
    { value: "Apenas Consulta" },
    { value: "Gerou Processo" },
    { value: "Não Compareceu" },
  ];

  //Filtro
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  
  semHorario: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private usuarioService: AuthUsuarioService
  ) { }

  ngOnInit(): void {

    this.agenda = new Agendamento();
    this.agendaForm = this.formBuilder.group({
      nome_medico: ['', [Validators.required]],
      crm: [0, [Validators.required]],
      prestador: ['', [Validators.required]],
      telefone: [''],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      user: [''],
      email: [''],
      atendimento: [''],
      observacao: [''],
      procedimento: [''],
      enxaixe: []
    })

    this.agendaForm.reset();

  }
  
  agendar(setor: string) {
    
    const dataString = this.agendaForm.value.data;

    const dataStr = dataString.toString("");
    const str_ = dataStr.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const numeroAleatorio = Math.floor(Math.random() * 10000);
    const numeroAleatorioString = numeroAleatorio.toString();

    this.agendaForm.value.user = this.usuarioService.resp[0];
    this.agendaForm.value.procedimento = "";
  
    //Verifica se já existe o agendamento no DB, se não houver, cria um novo agendamento. 
    this.agendaService.agendar(`agendamentos/${setor}/${strin}/encaixe/${numeroAleatorioString}`, this.agendaForm.value, false);
  }

  verificarAgenda() {
    if (this.agendaForm.value.prestador == "CICLANO") {
      this.agendar("CICLANO");
    } else {
      this.agendar("FULANO");
    }
  }

}