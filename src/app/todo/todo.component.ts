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
    if (typeof(Storage) != "undefined" && input.value != '') {

      var task = {
        "id": this.getUniqueId(),
        'text': input.value,
        'checked': false
      };

      this.todo.tasks.push(task);
      this.stringifyAndUpdate();
      input.value = ''
    } else {
      console.log('Sorry, LocalStorage not working in this browser!');
    }
  }

  updateTasks(task, event) {
    if (typeof(Storage) != "undefined") {
      task.checked = event.target.checked

      this.stringifyAndUpdate();
    }
  }

  deleteTask(task) {
    this.todo.tasks = this.todo.tasks.filter(function(item) {
      return task.id != item.id;
    });
    this.stringifyAndUpdate();
  }

  stringifyAndUpdate() {
    var stringifyTasks = JSON.stringify(this.todo.tasks)
    localStorage.setItem('tasks', stringifyTasks)
  }

  getUniqueId() {
    var uniqueId = new Date().getUTCMilliseconds();
    return uniqueId;
  }

  ngOnInit() {
  }

}
