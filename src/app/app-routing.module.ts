import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameComponent } from './components/game/game.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPasswordsComponent } from './components/admin-passwords/admin-passwords.component';

const routes: Routes = [
  { path: '', redirectTo: 'lobby', pathMatch: 'full' },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game/:roomId', component: GameComponent},
  { path: 'admin', component: AdminPanelComponent },
  { path: 'passwords', component: AdminPasswordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
