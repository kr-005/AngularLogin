import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {signal, computed, effect } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class Api {
  
  // Step 1: Create a signal
    // Signal to hold shared state
  private _count = signal(0);

  // Public readonly access
  count = this._count.asReadonly();

  // Step 2: Create a computed signal
  doubleCount = computed(() => this._count() * 2);
//Signal methods
  // Signal update methods
  increment() {
    this._count.update((n) => n + 1);
  }

  decrement() {
    this._count.update((n) => n - 1);
  }

  reset() {
    this._count.set(0);
  }
  // Step 3: Create an effect (optional)
  constructor(private http: HttpClient) {effect(() => {
      console.log('Count changed:', this._count());
    });}

  Login(data: any): Observable<any> {
    alert(`${environment.apiUrl}/login/login`);
    return this.http.post(`${environment.apiUrl}/login/login`, data);
  }
}
