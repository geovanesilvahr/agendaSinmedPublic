import { Component, Renderer2 } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { AuthUsuarioService } from 'src/app/services/usuario/auth.usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  auth_s = getAuth();

  constructor(
    private router: Router,
    private auth: AuthUsuarioService,
    private usuarioService: AuthUsuarioService,
    private renderer: Renderer2
  ) { }

  nome: string = this.auth.resp;

  ngInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLinks();
      }
    });
  }

  isLinkActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  updateActiveLinks() {
    const links = document.querySelectorAll('.opcoes a');
    links.forEach((link) => {
      const routerLink = link.getAttribute('routerLink');
      if (routerLink && this.isLinkActive(routerLink)) {
        this.renderer.addClass(link, 'selecionado');
      } else {
        this.renderer.removeClass(link, 'selecionado');
      }
    });
  }

  sair() {
    signOut(this.auth_s).then(() => {
      this.usuarioService.showMessage("Desconectado!", true);
      this.router.navigate(['/']);
    }).catch((error) => {
      this.usuarioService.showMessage(`Ocorreu um erro! ${error}`);
    });
  }
}
