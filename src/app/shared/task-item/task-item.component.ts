import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../datatypes/task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  constructor(public taskService: TaskService, public router: Router, public activatedRoute: ActivatedRoute) {
    // The class variable task is NOT available in the constructor.
    // the variable will only be initialized after the constructor has finished.
    // Any other method that is called from the constructor is also unable
    // to use the class variable.
  }

  ngOnInit(): void {
    // This is the first method where the class variable task can be used.
  }
}
