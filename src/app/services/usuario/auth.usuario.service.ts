import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import 'firebase/database';
import { Agendamento } from '../../models/agendamento';
import { MatSnackBar } from '@angular/material/snack-bar';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  databaseURL: "",
};

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})

export class AuthUsuarioService {

  tutorialsRef: AngularFireList<Agendamento> | undefined;

  private usuarioAutenticado: boolean = false;
  mostrarHaircutEmitter = new EventEmitter<boolean>();

  resp: any;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  
  usuarioEstaAutenticado() {
      return this.usuarioAutenticado;
  }

  handleAuthError(error: any) {
    if (error.code) {
      this.showMessage('Esse email é inválido ou está em uso!')
      return error;
    }
  }

  login(email: string, password: string): any{
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      this.usuarioAutenticado = true;
      this.router.navigate(['/juridico']);
      const user = res.user?.email;
      this.resp = user?.split("@");
    }, err => {
      this.showMessage('Usuário e/ou Senha Incorreta!', true );
      this.usuarioAutenticado = false;
      return this.usuarioAutenticado;
    })
    return this.usuarioAutenticado;
  }
  
}
