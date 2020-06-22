import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    SplitButtonModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
