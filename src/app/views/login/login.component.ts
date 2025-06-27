import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUsuarioService } from 'src/app/services/usuario/auth.usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { version } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  version: any = version;

  horarios$?: Observable<any>;
  dadosEncontrados: boolean = false;
  loadingData: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])

  @Input() usuario!: Usuario;

  loginForm!: FormGroup;  

  constructor(
    private authUser: AuthUsuarioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.usuario = new Usuario();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)],],
      id: [0],
      cargo: [''],
      nome: ['']
    })

    this.loginForm.reset();
  }


  login() {

    this.authUser.login(this.usuario.email + "@gmail.com", this.usuario.password).subscribe((result: boolean) => {
      if (result == true) {
        this.dadosEncontrados = false;
      } else {
        this.dadosEncontrados = false;
        this.loadingData = false;
      }
      this.loadingData = false;
    })


  }

}

