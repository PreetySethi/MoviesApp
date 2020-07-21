import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  
  Movie:any = [];
  socketService: any;

  constructor(private apiService: ApiService) { 
    this.readMovie();
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  readMovie(){
    this.apiService.getMovies().subscribe((data) => {
     this.Movie = data;
    })    
  }

  removeMovie(movie, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteMovie(movie._id).subscribe((data) => {
          this.Movie.splice(index, 1);
        }
      )    
    }
  }

}