import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerProfile } from 'src/app/interfaces/player-profile.interface';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
players: Record<string, PlayerProfile> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
this.http.get<Record<string, PlayerProfile>>(
  'http://localhost:3000/admin/players?secret=MY_SECRET_KEY_123'
)
.subscribe(data => {
  this.players = data;
});
  }
}
