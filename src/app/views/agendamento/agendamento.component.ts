import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agendamento } from 'src/app/models/agendamento';
import { AuthUsuarioService } from 'src/app/services/usuario/auth.usuario.service';


interface Prestadores {
  value: string;
  viewValue: string;
}

interface Horarios {
  horario: string;
}

interface Atendimento {
  value: string;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})

export class AgendamentoComponent {

  favoriteSeason: string = '';

  selected?: string | any;
  openDialog: boolean = true;
  fontStyleControl = new FormControl('');
  fontStyle?: string;

  prestador_select: String | undefined;
  procedimento_select: String | undefined;

  @Input() agenda!: Agendamento;

  agendaForm!: FormGroup;

  prestadores: Prestadores[] = [];

  atendimento: Atendimento[] = [
    { value: 'Presencial' },
    { value: 'Online' },
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

  horarios: Horarios[] = [
  ];

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
      crm: [[Validators.required, Validators.min(3)]],
      prestador: ['', [Validators.required]],
      telefone: [''],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      user: [''],
      email: [''],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
      procedimento: [''], // Gerou Processo ou Apenas Consulta ou Não Compareceu.
      enxaixe: []
    })
    
    this.agendaForm.reset();
  }

  addEvent() {
    if (this.favoriteSeason == 'Juridico') {

      this.horarios = [];
      this.prestadores = [];

      this.horarios = [
        { horario: '14:00' },
        { horario: '14:30' },
        { horario: '15:00' },
        { horario: '15:30' },
        { horario: '16:00' },
        { horario: '16:30' },
        { horario: '17:00' },
        { horario: '17:30' }
      ];

      this.prestadores = [
        { value: 'FULANO', viewValue: 'FULANO' },
        { value: 'FULANO', viewValue: 'FULANO' },
        { value: 'FULANO', viewValue: 'FULANO' },
        { value: 'FULANO', viewValue: 'FULANO' },
        { value: 'FULANO', viewValue: 'FULANO FULANO' }
      ];

    } else if (this.favoriteSeason == 'ProgramaQV') {

      this.horarios = [];
      this.prestadores = [];

      this.horarios = [
        { horario: '08:00' },
        { horario: '09:00' },
        { horario: '10:00' },
        { horario: '11:00' },
        { horario: '12:00' },
        { horario: '13:00' },
        { horario: '14:00' },
        { horario: '15:00' },
        { horario: '16:00' },
        { horario: '17:00' }
      ];

      this.prestadores = [
        { value: 'FULANO', viewValue: 'FULANO'},
        { value: 'FULANO', viewValue: 'FULANO' }
      ];

    } else if (this.favoriteSeason == 'CICLANO') {

      this.horarios = [];
      this.prestadores = [];

      this.horarios = [
        { horario: '14:00' },
        { horario: '14:30' },
        { horario: '15:00' },
        { horario: '15:30' },
        { horario: '16:00' },
        { horario: '16:30' },
        { horario: '17:00' },
        { horario: '17:30' }
      ];

      this.prestadores = [
        { value: 'CICLANO', viewValue: 'CICLANO' }
      ]

    }
  }

  adicionarHorario(horarioNovo: string) {
    this.horarios.push({ horario: horarioNovo });
  }
  
  agendar(setor: string) {

    if(this.agendaForm.value){
      const dataString = this.agendaForm.value.data;
  
      const dataStr = dataString.toString("");
      const str_ = dataStr.split(" ");
      var strin = str_[1] + str_[2] + str_[3];
  
      this.agendaForm.value.user = this.usuarioService.resp[0];
      this.agendaForm.value.procedimento = "";
      this.agendaService.agendar(`agendamentos/${setor}/${strin}/${this.agendaForm.value.hora}`, this.agendaForm.value, false);
    } else {
      this.usuarioService.showMessage("Campos Vazios! Preencha com os dados.")
    }
  }

  verificarAgenda() {
    if (this.agendaForm.value.prestador == "CICLANO") {
      this.agendar("CICLANO");
    } else if (this.agendaForm.value.prestador == "FULANO") {
      this.agendar('SETORX/FULANO');
    } else if (this.agendaForm.value.prestador == "FULANO") {
      this.agendar('SETORX/FULANO');
    } else {
      this.agendar("FULANO");
    }
  }

}
