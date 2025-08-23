import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import{ Api } from '../service/api';

@Component({
  selector: 'app-user-creation',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-creation.html',
  styleUrl: './user-creation.css'
})
export class UserCreation implements OnInit {
  constructor(private route: ActivatedRoute, public APIURL: Api) {}
  title: string = 'Welcome ';
  name: string = '';
  email: string = '';
  MobileNo: number = 0;
  car = [
    { brand: 'Toyota', model: 'Camry', year: 2020},
    { brand: 'Honda', model: 'Civic', year: 2019  },
    { brand: 'Ford', model: 'Mustang', year: 2021}
  ];
  
 ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.title+= params['username'];
      console.log('Username from query params:', params['username']);
    });
    
  }

  selected: number | null = null;

 getSelectedCars() {
    return this.car.find(cars => cars.year === this.selected);
  }
  onSubmit() {
    if (!this.email || !this.MobileNo || !this.name) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Request created successfully!');
  }
}


