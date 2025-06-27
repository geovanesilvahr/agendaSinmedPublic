import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
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
  selector: 'app-update-agengamento',
  templateUrl: './update-agendamento.component.html',
  styleUrls: ['./update-agendamento.component.css']
})
export class UpdateAgendamentoComponent {

  selected?: Date;
  prestador_select: String | undefined;
  procedimento_select: String | undefined;

  @Input() agenda!: Agendamento;

  agendaForm!: FormGroup;

  prestadores: Prestadores[] = [
    { value: 'Aluizio', viewValue: 'Aluizio' },
    { value: 'Haroldo', viewValue: 'Haroldo Menezes' },
    { value: 'Rafael', viewValue: 'Rafael Dantas' },
    { value: 'Romy', viewValue: 'Romy Christine' },
    { value: 'Rinaldo', viewValue: 'Rinaldo Negromonte' },
    { value: 'Glausiiev', viewValue: 'Glausiiev Dias' },
    { value: 'NUTRIeEDFISICO', viewValue: 'NUTRIeEDFISICO'},
    { value: 'PSICOLOGA', viewValue: 'PSICOLOGA'}
  ];

  procedimento: Atendimento[] = [
    { value: "Apenas Consulta" },
    { value: "Gerou Processo" },
    { value: "Não Compareceu" },
  ];

  atendimento: Atendimento[] = [
    { value: 'Presencial' },
    { value: 'Online' },
    { value: 'Por Telefone' }
  ];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  horarios: Horarios[] = [
    { horario: '10:00' },
    { horario: '11:00' },
    { horario: '12:00' },
    { horario: '13:00' },
    { horario: '14:00' },
    { horario: '14:30' },
    { horario: '15:00' },
    { horario: '15:30' },
    { horario: '16:00' },
    { horario: '16:30' },
    { horario: '17:00' },
    { horario: '17:30' },
  ];

  hora!: string;
  setor!: string;
  data!: string;
  path!: string;
  datat!: string;
  dataC!: string;
  somentePrestador!: string;
  setorPath!: string;
  user!: string;  

  constructor(
    private routerAtc: ActivatedRoute,
    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private usuarioService: AuthUsuarioService
  ) { }

  ngOnInit() {

    this.agenda = new Agendamento();
    this.agendaForm = this.formBuilder.group({
      nome_medico: ['', [Validators.required]],
      crm: ['0', [Validators.required]],
      prestador: ['', [Validators.required]],
      telefone: [''],
      hora: ['', [Validators.required]],
      user: [''],
      email: [''],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
      procedimento: [''], // Gerou Processo ou Apenas Consulta ou Não Compareceu.
    })

    // Obtenha os parâmetros da rota
    const paramMap: ParamMap = this.routerAtc.snapshot.paramMap!;

    // Verifique se 'id' está presente
    if (paramMap.has('hora') || paramMap.has('id')) {
      // Obtenha o valor da 'id' e converta para número
      this.hora = paramMap.get('hora')!;
      this.setor = paramMap.get('setor')!;
      this.data = paramMap.get('data')!;
      this.somentePrestador = paramMap.get('prestador')!;

      if (this.somentePrestador){
        this.setorPath = this.setor + '/' + this.somentePrestador;
      } else {
        this.setorPath = this.setor
      }

      var dataStr = this.data!.toString();
      var str_ = dataStr!.split(" ");
      var strin = str_[1] + str_[2] + str_[3];
      this.datat = str_[1];

      if (paramMap.get('encaixe') == 'true') {
        this.path = `agendamentos/${this.setorPath}/${strin}/encaixe/${this.hora}`;
      } else {
        this.path = `agendamentos/${this.setorPath}/${strin}/${this.hora}`;
      }

      this.agendaService.getData(this.path).subscribe((result) => {
        this.prestador_select = result.prestador;
        this.user = result.user;
        if (this.datat == 'Jan') {
          this.dataC = str_[2] + "/01/" + str_[3];
        } else if (this.datat == 'Feb') {
          this.dataC = str_[2] + "/02/" + str_[3];
        } else if (this.datat == 'Mar') {
          this.dataC = str_[2] + "/03/" + str_[3];
        } else if (this.datat == 'Apr') {
          this.dataC = str_[2] + "/04/" + str_[3];
        } else if (this.datat == 'May') {
          this.dataC = str_[2] + "/05/" + str_[3];
        } else if (this.datat == 'Jun') {
          this.dataC = str_[2] + "/06/" + str_[3];
        } else if (this.datat == 'Jul') {
          this.dataC = str_[2] + "/07/" + str_[3];
        } else if (this.datat == 'Aug') {
          this.dataC = str_[2] + "/08/" + str_[3];
        } else if (this.datat == 'Sep') {
          this.dataC = str_[2] + "/09/" + str_[3];
        } else if (this.datat == 'Oct') {
          this.dataC = str_[2] + "/10/" + str_[3];
        } else if (this.datat == 'Nov') {
          this.dataC = str_[2] + "/11/" + str_[3];
        } else if (this.datat == 'Dec') {
          this.dataC = str_[2] + "/12/" + str_[3];
        }

        this.agenda = new Agendamento();
        this.agendaForm = this.formBuilder.group({
          nome_medico: [result.nome_medico, [Validators.required]],
          crm: [result.crm, [Validators.required]],
          prestador: [this.prestador_select, [Validators.required]],
          telefone: [result.telefone],
          hora: [result.hora, [Validators.required]],
          user: [result.usuario],
          atendimento: [result.atendimento],
          observacao: [result.observacao],
          procedimento: [result.procedimento],
          
        })
      });
    }
  };

  updateAgendamento(): void {
  };

  verificarAgenda() {
    if (this.agendaForm.value.prestador == "Rinaldo") {
      this.updateAgenda('contabil');
    } else if (this.agendaForm.value.prestador == "NUTRIeEDFISICO") {
      this.updateAgenda('programaqv/nutriEdFisico');
    } else if (this.agendaForm.value.prestador == "PSICOLOGA") {
      this.updateAgenda('programaqv/psicologa');
    } else if (this.routerAtc.snapshot.paramMap.get('encaixe') == 'true') {
      this.updateAgenda(this.setor, true);	
    } else {
      this.updateAgenda('juridico');
    }
  }

  updateAgenda(setor: string, encaixe: boolean = false) {

    const dataStr = this.data;
    const str_ = dataStr.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    this.agendaForm.value.user = this.usuarioService.resp[0];
    if (encaixe == true) {
      this.agendaService.update(
        `agendamentos/${setor}/${strin}/encaixe/${this.agendaForm.value.hora}`,
        `agendamentos/${setor}/${strin}/encaixe/${this.hora}`, this.agendaForm.value, setor, 
        this.prestador_select ? this.prestador_select.toString() : ''
      );
    } else {
      this.agendaService.update(
        `agendamentos/${setor}/${strin}/${this.agendaForm.value.hora}`,
        `agendamentos/${setor}/${strin}/${this.hora}`, this.agendaForm.value, setor, 
        this.prestador_select ? this.prestador_select.toString() : ''
      );
    }

  }

}
