import { EventEmitter, Injectable } from '@angular/core';
import { Agendamento } from '../../models/agendamento';
import { getDatabase } from 'firebase/database';
import { getAuth } from '@angular/fire/auth';
import { Observable, take } from 'rxjs';
import { AuthUsuarioService } from '../usuario/auth.usuario.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  tutorialsRef: AngularFireList<Agendamento> | undefined;

  private usuarioAutenticado: boolean = false;
  mostrarHaircutEmitter = new EventEmitter<boolean>();
  dbRef = getDatabase();

  auth = getAuth();
  resp: any;

  constructor(
    private db: AngularFireDatabase,
    private usuarioService: AuthUsuarioService,
    private router: Router
  ) { }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  handleAuthError(error: any) {
    if (error.code) {
      this.usuarioService.showMessage('Esse email é inválido ou está em uso!', true);
      return error;
    }
  }

  getData(path: string): Observable<any> {
    return this.db.object(path).valueChanges();
  }

  update(path: string, dataAnterior: string, data: Agendamento, setor: string, prestador: string) {

    const agendamentoRef = this.db.object(path);
    agendamentoRef.snapshotChanges().pipe(take(1)).subscribe(snapshot => {
      if (snapshot.payload.exists()) {
        if(path == dataAnterior){
          agendamentoRef.update(data);
          this.usuarioService.showMessage('Agendamento Atualizado!', false);
          if(setor == 'nutriEdFisico' || setor == 'psicologa') {
            this.router.navigate([`/${setor}/${prestador}`])
          } else
          this.router.navigate([`/${setor}`])
        } else {
          this.usuarioService.showMessage('Já Existe um Agendamento nesse Horário!', false);
        }
      } else {
        agendamentoRef.update(data)
          .then(() => {
            this.db.object(dataAnterior).remove()
            this.usuarioService.showMessage('Agendamento Atualizado!', true);
          })
          .catch(error => {
            console.error('Erro ao criar o agendamento:', error);
          });
      }
    });

  }

  agendar(path: string, data: Agendamento, msgExclusao: boolean) {

    const agendamentoRef = this.db.object(path);

    agendamentoRef.snapshotChanges().pipe(take(1)).subscribe(snapshot => {
      if (snapshot.payload.exists()) {
        this.usuarioService.showMessage('Já existe um agendamento para esta data e hora!');
      } else {
        agendamentoRef.set(data)
          .then(() => {
            if(msgExclusao == true){
              this.usuarioService.showMessage('Agendamento Excluído!');
            } else {
              this.usuarioService.showMessage('Adicionado com sucesso!');
            }
          })
          .catch(error => {
            console.error('Erro ao criar o agendamento:', error);
          });
      }
    });
  }

  async delete(path: string) {
    try {
      await this.db.object(path).remove();
      this.usuarioService.showMessage("Agendamento Excluido!", false)
    } catch (error) {
      this.usuarioService.showMessage(`Erro ao tentar excluir! Erro: ${error}`, true)
    }
  }
}
