import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AuthGuard } from './guards/auth-guard.guard';
import { AuthUsuarioService } from './services/usuario/auth.usuario.service';

import { LoginComponent } from './views/login/login.component';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MAT_DATE_LOCALE, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { DatabaseModule } from '@angular/fire/database'
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './templates/header/header.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContabilComponent } from './views/setores/contabil/contabil/contabil.component';
import { JuridicoComponent } from './views/setores/juridico/juridico/juridico.component';
import { MatDialogModule } from '@angular/material/dialog';
import localePt from '@angular/common/locales/pt';
import { environment } from 'src/environments/environment.prod';
import { UpdateAgendamentoComponent } from './views/update-agendamento/update-agendamento.component';
import { EncaixeComponent } from './views/encaixe/encaixe.component';
import { ProgramaQVComponent } from './views/setores/programa-qv/programa-qv/programa-qv.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AgendamentoComponent,
    HeaderComponent,
    ContabilComponent,
    JuridicoComponent,
    UpdateAgendamentoComponent,
    EncaixeComponent,
    ProgramaQVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatTableModule,
    CommonModule,
    DatePipe,
    MatToolbarModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    DatabaseModule,
    MatIconModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    provideFirebaseApp(() => initializeApp(environment)),
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    JuridicoComponent,
    MatNativeDateModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    AuthGuard,
    AuthUsuarioService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
