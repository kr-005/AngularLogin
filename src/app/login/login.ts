import { CommonModule } from '@angular/common';
import { Component, Query } from '@angular/core';
import{ FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../service/api';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 Username: string = '';
  Password: string = '';
  text:string='';


  loginFormvalidation: FormGroup;

constructor(private router: Router, public APIURL: Api,private fb: FormBuilder) {

  this.loginFormvalidation = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
 }


 
  login() {
    if (this.loginFormvalidation.valid) {
      const formData = this.loginFormvalidation.value;
      alert(`Username: ${formData.Username}, Password: ${formData.Password}`);
    } else {
      alert('Form is invalid');
    }
  }











//Signal methods End
  onSubmit() {
    if (!this.Username || !this.Password) {
      alert('Please fill in both fields.');
      return;
    }
    try{
this.APIURL.Login({ Username: this.Username, Password: this.Password }).subscribe(
      (response) => {
        var Result=JSON.stringify(response);
         if (response && response.welcomeMsg?.toLowerCase().includes('welcome')) {
          this.router.navigate(['/user-creation'], { queryParams: { username: response.user } });
        } else {
          alert('Login failed. Please check your credentials.');
        }
      },
      (error) => {
         if (error.error && error.error.message) {
      alert('Error: ' + error.error.message);
    } else {
      alert('An unexpected error occurred: ' + JSON.stringify(error));
    }
      }
    );

  }catch(error){
    alert('Error during login:'+ error);}
  }
}
