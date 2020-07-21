
import * as io from 'socket.io-client';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      query: {
        token: 'cde'
      }
    });

    this.socket.emit('my message', 'Hello there from Angular.');

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }
}