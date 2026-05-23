import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPasswordsComponent } from './components/admin-passwords/admin-passwords.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    GameComponent,
    AdminPanelComponent,
    AdminPasswordsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
