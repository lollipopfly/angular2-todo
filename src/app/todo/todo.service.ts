import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  tasks:any;

  constructor() {
    if(typeof(Storage) != "undefined") {
      this.tasks = localStorage.getItem('tasks');
    }
  }

  saveTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(function(item) {
      return task.id != item.id;
    });
  }
}
