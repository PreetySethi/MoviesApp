import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})

export class MovieCreateComponent implements OnInit {  
  submitted = false;
  movieForm: FormGroup;
  MovieProfile:any = ['1 star', '2 star', '3 star', '4 star', '5 star']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.movieForm = this.fb.group({
      name: ['', [Validators.required]],
      
      rating: ['', [Validators.required]],
      
    })
  }

  // Choose rating with select dropdown
  updateProfile(e){
    this.movieForm.get('rating').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.movieForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.movieForm.valid) {
      return false;
    } else {
      this.apiService.createMovie(this.movieForm.value).subscribe(
        (res) => {
          console.log('Movie successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/movies-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
