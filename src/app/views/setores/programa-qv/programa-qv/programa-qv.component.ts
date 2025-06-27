import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-programa-qv',
  templateUrl: './programa-qv.component.html',
  styleUrls: ['./programa-qv.component.css'],
})

export class ProgramaQVComponent {

  selected?: any | null;
  selectedTabIndex: number = 0;
  panelOpenState = false;

  tabChanged(event: any): void {
    this.agendaForm.reset();
  }

  //Variáveis dos Horários Individuais
  agenda0800 = Object();
  agenda0900 = Object();
  agenda1000 = Object();
  agenda1100 = Object();
  agenda1200 = Object();
  agenda1300 = Object();
  agenda1400 = Object();
  agenda1500 = Object();
  agenda1600 = Object();
  agenda1700 = Object();

  @Input() agenda!: Agendamento;

  agendaForm!: FormGroup;

  horarios$?: Observable<any>;
  dadosEncontrados: boolean = false;
  loadingData: boolean = false;

  cardCor: string = '';

  constructor(

    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    private usuarioService: AuthUsuarioService,
    public dialog: MatDialog,
    private router: Router

  ) {  }

  ngOnInit(): void {

    this.agenda = new Agendamento();
    this.agendaForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      crm: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      nome_medico: ['', [Validators.required]],
      email: [''],
      prestador: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
    })
  }

  atualizarPagina(): void {
    this.selected = null;
    this.agenda0800 = [];
    this.agenda0900 = [];
    this.agenda1000 = [];
    this.agenda1100 = [];
    this.agenda1200 = [];
    this.agenda1300 = [];
    this.agenda1400 = [];
    this.agenda1500 = [];
    this.agenda1600 = [];
    this.agenda1700 = [];
  
  }

  events: string[] = [];

  addEvent(type: string, event: string, prestador: string) {
    this.getAgenda(prestador);
  }

  mostrar(){
    console.log(this.selected);
  }

  //Método GET 2 - Faz a Requisitação de Todos os Horários no DB
  getAgenda(prestador: string) {

    this.loadingData = true;

    this.agenda0800 = [];
    this.agenda0900 = [];
    this.agenda1000 = [];
    this.agenda1100 = [];
    this.agenda1200 = [];
    this.agenda1300 = [];
    this.agenda1400 = [];
    this.agenda1500 = [];
    this.agenda1600 = [];
    this.agenda1700 = [];

    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const path = `agendamentos/programaqv/${prestador}/${strin}`;

    //Requisição Individual do Horário
    this.agendaService.getData(path + "/08:00").subscribe((result) => {
      if (result) {
        this.agenda0800 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/09:00").subscribe((result) => {
      if (result) {
        this.agenda0900 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/10:00").subscribe((result) => {
      if (result) {
        this.agenda1000 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/11:00").subscribe((result) => {
      if (result) {
        this.agenda1100 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/12:00").subscribe((result) => {
      if (result) {
        this.agenda1200 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/13:00").subscribe((result) => {
      if (result) {
        this.agenda1300 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/14:00").subscribe((result) => {
      if (result) {
        this.agenda1400 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/15:00").subscribe((result) => {
      if (result) {
        this.agenda1500 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });
    
    this.agendaService.getData(path + "/16:00").subscribe((result) => {
      if (result) {
        this.agenda1600 = result;
        this.dadosEncontrados = true;
      } else {
        this.dadosEncontrados = false;
      }
      this.loadingData = false;
    });

    this.agendaService.getData(path + "/17:00").subscribe((result) => {
      if (result) {
        this.agenda1700 = result;
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
      email: [''],
      atendimento: [''], // Online ou Presencial.
      observacao: [''], // Campo de Observação.
      procedimento: [''], // Gerou Processo ou Apenas Consulta ou Não Compareceu.
    });
  }

  //Redireciona para a tela de Atualizar Agendamento, onde exibe todas as informações do agendamento.
  updateAgendamento(hora: string, prestador: string) {
    this.router.navigate(['/update', { hora: hora, setor: 'programaqv', prestador: prestador, data: this.selected }]);
  }

  //Mostra uma confirmação de exclusão, se positivo, exclui o agendamento selecionado. 
  deleteHorario(hora: string, prestador: string) {

    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const numeroAleatorio = Math.floor(Math.random() * 10000);
    const numeroString = numeroAleatorio.toString();

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.agendaService.delete(`agendamentos/programaqv/${prestador}/${strin}/${hora}`);
        if (hora == '08:00') {
          this.agenda0800.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda0800, true);
          this.agenda0800 = [];
        } else if (hora == '09:00') {
          this.agenda0900.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda0900, true);
          this.agenda0900 = [];
        } else if (hora == '10:00') {
          this.agenda1000.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1000, true);
          this.agenda1000 = [];
        } else if (hora == '11:00') {
          this.agenda1100.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1100, true);
          this.agenda1100 = [];
        } else if (hora == '12:00') {
          this.agenda1200.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1200, true);
          this.agenda1200 = [];
        } else if (hora == '13:00') {
          this.agenda1300.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1300, true);
          this.agenda1300 = [];
        } else if (hora == '14:00') {
          this.agenda1400.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1400, true);
          this.agenda1400 = [];
        } else if (hora == '15:00') {
          this.agenda1500.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1500, true);
          this.agenda1500 = [];
        } else if (hora == '16:00') {
          this.agenda1600.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1600, true);
          this.agenda1600 = [];
        } else if (hora == '17:00') {
          this.agenda1700.user = this.usuarioService.resp[0];
          hora = hora + numeroString;
          this.agendaService.agendar(`exclusoes/programaqv/${prestador}/${strin}/${hora}`, this.agenda1700, true);
          this.agenda1700 = [];
        }
      }
    });
  }
}


