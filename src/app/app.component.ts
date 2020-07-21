import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})

export class AppComponent implements OnInit {
  title = 'MovieApp';
  constructor(private webSocketService: WebSocketService){}
ngOnInit()
  {
      // listen an event from the socket.io server
      this.webSocketService.setupSocketConnection();     
  }
}
