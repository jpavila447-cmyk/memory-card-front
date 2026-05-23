import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { UAParser } from 'ua-parser-js';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameState: any;
  roomId!: string;

  myId!: string;

  winner: any = null; // 🏆

  deviceInfo: any;

  constructor(
    private socket: SocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.deviceInfo = this.getDeviceInfo();

    this.roomId = this.route.snapshot.paramMap.get('roomId')!;

    this.socket.connect();

    // 👤 use persistent ID
    this.myId = this.socket.getPlayerId();

    this.socket.sendDeviceInfo({
    playerId: this.myId,
    roomId: this.roomId,
    deviceInfo: this.deviceInfo
    });

    // 🎮 listen game state
    this.socket.gameState$.subscribe(state => {
      this.gameState = state;
    });

    // 🏆 listen game end
    this.socket.gameEnded$.subscribe(data => {
      if (data) {
        this.winner = data.winner;
      }
    });
  }

  // 🃏 flip card
  flip(index: number) {
    if (!this.canPlay()) return;

    this.socket.flipCard(this.roomId, index);
  }

  // 👁️ check card visibility
  isFlipped(i: number): boolean {
    return this.gameState?.flipped.includes(i) ||
           this.gameState?.matched.includes(i);
  }

  // 🧠 can player play?
  canPlay(): boolean {
    if (!this.gameState) return false;

    const currentPlayer =
      this.gameState.players[this.gameState.turnIndex];

    const me = this.gameState.players.find(
      (p: any) => p.id === this.myId
    );

    return (
      currentPlayer?.id === this.myId &&
      me?.timeLeft > 0 &&
      !this.gameState.gameOver
    );
  }

getWinnerName(): string {
  if (!this.gameState || !this.gameState.winner) return '';

  const player = this.gameState.players.find(
    (p: any) => p.id === this.gameState.winner
  );

  return player ? player.name : '';
}

getDeviceInfo() {
  const ParserClass = (UAParser as any).default || UAParser;
  const parser = new ParserClass();

  const ua = parser.getResult();


  return {
    // 🔍 Parsed info (clean & readable)
    browser: ua.browser,
    os: ua.os,
    device: ua.device,
    cpu: ua.cpu,

    // 🌐 Raw browser data (more detailed / low-level)
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,

    // 🖥️ Screen info
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth
    },

    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },

    // ⏰ extra useful context
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}


}