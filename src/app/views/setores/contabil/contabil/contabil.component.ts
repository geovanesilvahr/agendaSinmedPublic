import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agendamento } from 'src/app/models/agendamento';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthUsuarioService } from 'src/app/services/usuario/auth.usuario.service';

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
  selector: 'app-contabil',
  templateUrl: './contabil.component.html',
  styleUrls: ['./contabil.component.css']
})
export class ContabilComponent {
  selected?: any | null;
  panelOpenState = false;

  //Variáveis dos Horários Individuais
  agenda1 = Object();
  agenda2 = Object();
  agenda3 = Object();
  agenda4 = Object();
  agenda5 = Object();
  agenda6 = Object();
  agenda7 = Object();
  agenda8 = Object();

  @Input() agenda!: Agendamento;

  total: Agenda[] = [];
  agendaForm!: FormGroup;

  expansionPanels: MatExpansionPanel[] = [];

  horarios$?: Observable<any>;
  dadosEncontrados: boolean = false;
  loadingData: boolean = false;

  constructor(

    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private usuarioService: AuthUsuarioService,
    public dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.agenda = new Agendamento();
    this.agendaForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      crm: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      nome_medico: ['', [Validators.required]],
      prestador: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: [''],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
      procedimento: [''], // Gerou Processo ou Apenas Consulta ou Não Compareceu.
    })
  }

  events: string[] = [];

  addEvent(type: string, event: string) {
    this.getAgenda()
  }

  //Método GET - Faz a Requisitação de Todos os Horários no DB
  getAgenda() {

    this.loadingData = true;

    this.agenda1 = [];
    this.agenda2 = [];
    this.agenda3 = [];
    this.agenda4 = [];
    this.agenda5 = [];
    this.agenda6 = [];
    this.agenda7 = [];
    this.agenda8 = [];

    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const path = `agendamentos/contabil/${strin}`;


    //Requisição Individual do Horário
    this.agendaService.getData(path + "/14:00").subscribe((result) => {
      if (result) {
        this.agenda1 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })

    this.agendaService.getData(path + "/14:30").subscribe((result) => {
      if (result) {
        this.agenda2 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/15:00").subscribe((result) => {
      if (result) {
        this.agenda3 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })
    
    this.agendaService.getData(path + "/15:30").subscribe((result) => {
      if (result) {
        this.agenda4 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })
    
    this.agendaService.getData(path + "/16:00").subscribe((result) => {
      if (result) {
        this.agenda5 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })
    
    this.agendaService.getData(path + "/16:30").subscribe((result) => {
      if (result) {
        this.agenda6 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })
    
    this.agendaService.getData(path + "/17:00").subscribe((result) => {
      if (result) {
        this.agenda7 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    })
    
    this.agendaService.getData(path + "/17:30").subscribe((result) => {
      if (result) {
        this.agenda8 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

  }

  updateHorario() {
    this.agenda = new Agendamento();
    this.agendaForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      crm: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      nome_medico: ['', [Validators.required]],
      prestador: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
      procedimento: [''], // Gerou Processo ou Apenas Consulta ou Não Compareceu.
    });
  }

  //Redireciona para a tela de Atualizar Agendamento, onde exibe todas as informações do agendamento.
  updateAgendamento(hora: string) {
    this.router.navigate(['/update', { hora: hora, setor: 'contabil', data: this.selected }]);
  }

  //Mostra uma confirmação de exclusão, se positivo, exclui o agendamento selecionado. 
  deleteHorario(hora: any) {
    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const numeroAleatorio = Math.floor(Math.random() * 10000);
    const numeroString = numeroAleatorio.toString();

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.agendaService.delete(`agendamentos/contabil/${strin}/${hora}`);
        if (hora == '14:00') {
          this.agenda1.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda1, true);
          this.agenda1 = [];
        } else if (hora == '14:30') {
          this.agenda2.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda2, true);
          this.agenda2 = [];
        } else if (hora == '15:00') {
          this.agenda3.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda3, true);
          this.agenda3 = [];
        } else if (hora == '15:30') {
          this.agenda4.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda4, true);
          this.agenda4 = [];
        } else if (hora == '16:00') {
          this.agenda5.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda5, true);
          this.agenda5 = [];
        } else if (hora == '16:30') {
          this.agenda6.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda6, true);
          this.agenda6 = [];
        } else if (hora == '17:00') {
          this.agenda7.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda7, true);
          this.agenda7 = [];
        } else if (hora == '17:30') {
          this.agenda8.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/contabil/${strin}/${hora}`, this.agenda8, true);
          this.agenda8 = [];
        }
      }
    });
  }
}
