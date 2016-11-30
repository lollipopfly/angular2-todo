import { Component, OnInit, Inject } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  task;
  id;
  text;
  checked;

  constructor(private todo:TodoService) {
    this.todo.tasks = JSON.parse(this.todo.tasks);
  }

  addTask(input) {
    if(input.value === '') return;

    var task = {
      "id": new Date().getUTCMilliseconds(),
      'text': input.value,
      'checked': false
    };

    this.todo.saveTask(task);
    this.saveTask();
    input.value = ''
  }

  updateTasks(task, event) {
    if (typeof(Storage) != "undefined") {
      task.checked = event.target.checked

      this.saveTask();
    }
  }

  deleteTask(task) {
    this.todo.removeTask(task);

    this.saveTask();
  }

  saveTask() {
    var stringifyTasks = JSON.stringify(this.todo.tasks)
    localStorage.setItem('tasks', stringifyTasks)
  }

  ngOnInit() {
  }

}
