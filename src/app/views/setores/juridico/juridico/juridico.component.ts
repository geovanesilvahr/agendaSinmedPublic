import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agendamento } from 'src/app/models/agendamento';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../dialog/dialog.component';
import { Router } from '@angular/router';

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
  selector: 'app-juridico',
  templateUrl: './juridico.component.html',
  styleUrls: ['./juridico.component.css']
})
export class JuridicoComponent {
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

  //------------- Encaixe ------------------
  agenda9 = Object();
  agenda10 = Object();
  agenda11 = Object();
  agenda12 = Object();
  agenda13 = Object();

  encaixes: { [key: string]: any } = {};

  @Input() agenda!: Agendamento;

  agendaForm!: FormGroup;

  horarios$?: Observable<any>;
  dadosEncontrados: boolean = false;
  loadingData: boolean = false;

  dateCheked: boolean = false;

  cardCor: string = '';

  //Filtro
  myFilter = (d: Date | any): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  constructor(

    private formBuilder: FormBuilder,
    private agendaService: AgendaService,
    public dialog: MatDialog,
    private router: Router

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
    })

  }

  events: string[] = [];

  addEvent() {
    this.getAgenda()
  }

  getUrl() {
    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const path = `agendamentos/juridico/${strin}`;

    return path;
  }

  //Método GET - Faz a Requisitação de Todos os Horários no DB
  getAgenda() {

    this.loadingData = true;
    this.agendaForm.reset();

    this.agenda1 = [];
    this.agenda2 = [];
    this.agenda3 = [];
    this.agenda4 = [];
    this.agenda5 = [];
    this.agenda6 = [];
    this.agenda7 = [];
    this.agenda8 = [];

    // ---------- Encaixe --------------
    this.agenda9 = [];
    this.agenda10 = [];
    this.agenda11 = [];
    this.agenda12 = [];
    this.agenda13 = [];

    const path = this.getUrl();

    this.agendaService.getData(path).subscribe((result) => {
      const horarios = Object.keys(result);

      horarios.forEach(hora => {
        const agendamento = result[hora];
        console.log(hora, agendamento);
      });
    });

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

    this.getEncaixe();

  }

  getEncaixe() {

    const path = this.getUrl();

    this.encaixes = [];

    this.agendaService.getData(path + "/encaixe/").subscribe((result) => {
      if (result) {
        this.encaixes = result; // mantém como objeto
        this.dadosEncontrados = true;
      } else {
        this.encaixes = {};
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
      atendimento: [''],
      observacao: [''],
      procedimento: [''],
    });
  }

  //Redireciona para a tela de Atualizar Agendamento, onde exibe todas as informações do agendamento.
  updateAgendamento(hora: string, encaixe: boolean) {
    if (encaixe == true) {
      this.router.navigate(['/update', { id: hora, setor: 'juridico/encaixe', data: this.selected, encaixe: encaixe }]);
    } else {
      this.router.navigate(['/update', { hora: hora, setor: 'juridico', data: this.selected }]);
    }
  }

  //Mostra uma confirmação de exclusão, se positivo, exclui o agendamento selecionado. 
  deleteHorario(id: Object, encaixe: boolean, dados: any) {

    var dataStr = this.selected!.toString();
    var str_ = dataStr!.split(" ");
    var strin = str_[1] + str_[2] + str_[3];

    const idStr = id.toString();

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        if (encaixe == true) {
          this.agendaService.delete(`agendamentos/juridico/${strin}/encaixe/${idStr}`);
          this.agendaService.agendar(`exclusoes/juridico/${strin}/encaixe/${idStr}`, dados, true);
        } else {
          this.agendaService.delete(`agendamentos/juridico/${strin}/${id}`);
          this.agendaService.agendar(`exclusoes/juridico/${strin}/${id}`, dados, true);
        }
      }

    });
  }

}

