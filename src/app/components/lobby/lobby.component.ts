import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../interfaces/player.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {

  // 🏠 Lobby players
  lobbyPlayers: Player[] = [];

  // 👑 Lobby host
  lobbyHost: string | null = null;

  // 👑 Am I host?
  isHost: boolean = false;

  // 🎮 Matches
  matches: any[] = [];

  // 🧹 subscriptions
  private subs: Subscription[] = [];

   form!: FormGroup;
   showForm: boolean = false;

  constructor(
    public socket: SocketService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initForm();
    // 🔌 connect
    this.socket.connect();

    // 🏠 enter lobby
    this.socket.enterLobby();

    // 🧹 clean previous listener
    this.socket.socket.off('game-started');

    // 🏠 players
    this.subs.push(
      this.socket.lobbyPlayers$.subscribe(players => {
        this.lobbyPlayers = players;
      })
    );

    // 🎮 matches
    this.subs.push(
      this.socket.matches$.subscribe(matches => {
        this.matches = matches;
      })
    );

    // 👑 host
    this.subs.push(
      this.socket.lobbyHost$.subscribe(host => {
        this.lobbyHost = host;
        this.isHost = host === this.socket.playerId;
      })
    );

    // 🚀 navigate to game
    this.socket.socket.on('game-started', ({ roomId }) => {
      this.router.navigate(['/game', roomId]);
    });
  }

  initForm() {
     this.form = this.fb.group({
      // 👤 identity
      name: [''],
      birthdate: [''],

      // 🎮 preferences
      favoriteTeam: [''],
      favoriteArtist: [''],
      favoriteSport: [''],
      hobby: [''],
    });
  }

  // 🧹 CLEANUP
  ngOnDestroy() {
    this.socket.socket.off('game-started');
    this.subs.forEach(s => s.unsubscribe());
  }

  // ▶️ Start game (ONLY HOST)
  startGameLobby() {
    this.socket.startGameLobby(); // ✅ use service
  }

  // 👑 Get host name
  getHostName(): string {
    const host = this.lobbyPlayers.find(p => p.id === this.lobbyHost);
    return host ? host.name : '';
  }

  submit() {
    if (this.form.invalid) return;
    console.log('Form submitted:', this.form);
    const playerId = this.socket.getPlayerId();

   this.socket.sendFormInfo({
    playerId: playerId,
    formInfo: this.form.value
   })
   this.showForm = false; // hide form after submission
  }
}