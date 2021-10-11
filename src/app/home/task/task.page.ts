import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from 'src/app/services/label.service';
import { Task } from 'src/datatypes/task';
import { Label } from 'src/datatypes/label';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  title: string;

  taskName: string;
  yearValues: string;
  deadline: string;
  description: string;
  id?: number = undefined;
  done = false;

  labels: Label[] = [];

  constructor(public navController: NavController,
    public taskService: TaskService,
    public activatedRoute: ActivatedRoute,
    public labelService: LabelService
    ) {
    // The following code generates a list of years that will be passed as options
    // to the date-time picker. Without this list the date-time picker allows
    // the user to choose a past date.
    this.title = 'New Task';
    const currentYear: number = (new Date()).getFullYear();
    const options: string[] = [];
    for (let year = currentYear; year < currentYear + 10; year++) {
      options.push(year.toString());
    }
    this.yearValues = options.join(',');
  }

  /**
   * Initialize the form elements if and when a route parameter has been added.
   */
  ngOnInit(): void {
    // ngOnInit is a lifecycle hook that is called after the constructor is
    // finished. Retrieving data from API's or services should happened here
    // since the constructor should only initialize class variables and leave
    // the other work to other methods. This ensures that page is loaded as fast
    // as possible. It is good practice to use
    // skeleton text (https://ionicframework.com/docs/api/skeleton-text) or
    // a loading indicator (https://ionicframework.com/docs/api/loading)
    // to let the user know that data is being retrieved.
    this.setData();
  }

  /**
   * Check if the page is used to view/edit a task and if so retrieve the details
   * of the task and initialize the form elements with this data.
   */
  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // No need to continue with the function if no parameter was specified.
    if (id === null) {
      return;
    }

    this.title = 'Edit task';

    // Route parameters are always strings, the conversion to number must happen manually.
    this.id = Number(id);

    const task = this.taskService.getTask(this.id);

    this.taskName = task.name;
    this.deadline = task.deadline;
    this.description = task.description;
    this.done = task.done;
    this.labels = task.labels;
  }

  /**
   * Handle a click event on the create/update button and determine which action has
   * to happen. Either a new task will be created or an existing task will be updated.
   */
  handleCreateAndUpdate(): void {
    if (this.id === undefined) {
      this.createTask();
    } else {
      this.updateTask();
    }
    this.navController.back();
  }

  /**
   * Create a new task with the attributes defined in the form.
   */
  private createTask(): void {
    this.taskService.newTask(this.taskName, this.description, this.deadline, this.labels);
  }

  /**
   * Update an existing task with the attributes defined in the form.
   */
  private updateTask(): void {
    this.taskService.updateTask({
      id: this.id,
      name: this.taskName,
      deadline: this.deadline,
      description: this.description,
      done: this.done,
      labels : this.labels
    });
  }
  private changeLabels(evt, label: Label): void{
    if(evt.detail.checked){
      this.labels.push(label);
    }
    else{
      this.labels = this.labels.filter(l=>l !== label);
    }
  }
  private checkLabel(label: Label): boolean{
    debugger;
    console.log('Alle labels: ' + label);
    console.log('Alle labels: ' + this.labels);
    if(this.labels.includes(label)){
      return true;
    }
    else{
      return false;
    }
  }
}
