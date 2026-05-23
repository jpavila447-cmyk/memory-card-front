import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../interfaces/player.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket!: Socket;

  playerId!: string;

  // 🎮 GAME
  gameState$ = new BehaviorSubject<any>(null);
  gameEnded$ = new BehaviorSubject<any>(null);

  // 🏠 LOBBY
  lobbyPlayers$ = new BehaviorSubject<Player[]>([]);
  lobbyHost$ = new BehaviorSubject<string | null>(null);
  matches$ = new BehaviorSubject<{
    roomId: string;
    players: { id: string; name: string; score: number; timeLeft: number }[];
    gameOver: boolean;
    winner: string | null;
  }[]>([]);

  constructor() {
    let playerId = localStorage.getItem('playerId');

    if (!playerId) {
      playerId = crypto.randomUUID();
      localStorage.setItem('playerId', playerId);
    }

    this.playerId = playerId;
  }

  // 🔌 CONNECT
  connect() {
    // ✅ prevent multiple connections
    if (this.socket?.connected) return;
  console.log(environment.socketUrl);
   this.socket = io(environment.socketUrl, {
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected:', this.socket.id);
     const roomId = localStorage.getItem('roomId');
    
      if (roomId) {
        this.socket.emit('rejoin-room', {
          roomId,
          playerId: this.playerId
        });
      }
    });

    // 🧹 CLEAN OLD LISTENERS (important!)
    this.socket.off('game-state');
    this.socket.off('game-ended');
    this.socket.off('lobby-updated');
    this.socket.off('matches-updated');

    // 🎮 GAME STATE
    this.socket.on('game-state', (state) => {
      this.gameState$.next(state);
        if (state?.gameOver) {
          localStorage.removeItem('roomId');
        }
    });

    // 🏁 GAME ENDED
    this.socket.on('game-ended', (data) => {
      this.gameEnded$.next(data);
    });

    // 🏠 LOBBY
    this.socket.on('lobby-updated', (data) => {
      this.lobbyPlayers$.next(data.players);
      this.lobbyHost$.next(data.host);
    });

    // 🎮 LIVE MATCHES
    this.socket.on('matches-updated', (matches) => {
      this.matches$.next(matches);
    });

    // 🚀 GAME STARTED (navigation handled in component)
    this.socket.on('game-started', (data) => {
       localStorage.setItem('roomId', data.roomId);
       localStorage.setItem('playerId', this.playerId)
      console.log('Game started:', data);
    });
  }

  // 🏠 ENTER LOBBY
  enterLobby() {
    // 🧹 reset game state when returning to lobby
    this.gameState$.next(null);
    this.gameEnded$.next(null);

    this.socket.emit('enter-lobby', {
      playerId: this.playerId
    });
  }

  // ▶️ START GAME FROM LOBBY
  startGameLobby() {    
    this.socket.emit('start-game-lobby');
  }

  // 🃏 FLIP CARD
  flipCard(roomId: string, index: number) {
    this.socket.emit('flip-card', { roomId, index });
  }

  // 🔌 DISCONNECT (optional)
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // 👤 GET PLAYER ID
  getPlayerId(): string {
    return this.playerId;
  }

  sendDeviceInfo(data: any) {
  this.socket.emit('device-info', data);
}

  sendFormInfo(data: any) {
    this.socket.emit('form-info', data);
  }
}