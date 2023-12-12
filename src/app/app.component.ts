import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { DataService } from './data.service';
import { Player } from './player';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: []
})
export class AppComponent implements OnInit {
onSort() {
  this.players.sort((a,b)=> a.First.localeCompare(b.First));
}
  socket = io('https://mst-full-stack-dev-test.herokuapp.com/')
  title = 'test'
  duplicate: boolean = false;
  data: any = [];
  players: Player[] = [];

  constructor(private _player: DataService, private router: Router){}

  ngOnInit(): void {
      this.getUser();    
  }

  getUser(): void {
      this.socket.on('data-update', (data: any) => {
        console.log('Received:', data);
        
        this.players.forEach(element => {
          if(data.MSTID == element.MSTID)
          {
            console.log("duplicate hit");
            this.duplicate = true;
          }
        });

        if(this.players.length == 0 || this.duplicate == false)
        {
          this.players.push(data);
          console.log(this.duplicate);
        }
        this.duplicate = false;
        console.log(this.players.length);
      })
      
  }

  selectPlayer() {
      this.router.navigateByUrl('/a');
  }
  

}