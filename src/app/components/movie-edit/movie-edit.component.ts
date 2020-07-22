import { Movie } from './../../model/Movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})

export class MovieEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  movieData: Movie[];
  MovieProfile: any = ['1 star', '2 star', '3 star', '4 star', '5 star']
  socketService: any;
  socket: any;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {    
    this.updateMovie();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getMovie(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      
      rating: ['', [Validators.required]]    
    })  
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('rating').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {zz
    return this.editForm.controls;
  }

  getMovie(id) {
    this.apiService.getMovie(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        rating: data['rating']
        
      });
    });
  }

  updateMovie() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      
      rating: ['', [Validators.required]]
      
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateMovie(id, this.editForm.value)
          .subscribe(res => { 
            this.router.navigateByUrl('/movies-list');
            this.socket.emit('updatedata', res);
            
            //console.log('Content updated successfully!');
           
           
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}