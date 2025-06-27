import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { JuridicoComponent } from './views/setores/juridico/juridico/juridico.component';
import { ContabilComponent } from './views/setores/contabil/contabil/contabil.component';
import { UpdateAgendamentoComponent } from './views/update-agendamento/update-agendamento.component';
import { ProgramaQVComponent } from './views/setores/programa-qv/programa-qv/programa-qv.component';
import { EncaixeComponent } from './views/encaixe/encaixe.component';


const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "agendamento", component: AgendamentoComponent, canActivate: [AuthGuard]},
  { path: "juridico", component: JuridicoComponent, canActivate: [AuthGuard] },
  { path: "contabil", component: ContabilComponent, canActivate: [AuthGuard] },
  { path: "update", component: UpdateAgendamentoComponent, canActivate: [AuthGuard] },
  { path: "programaqv", component: ProgramaQVComponent, canActivate: [AuthGuard]},
  { path: "encaixe", component: EncaixeComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
