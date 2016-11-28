import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  tasks:any = localStorage.getItem('tasks');

  constructor() {
  }

}
