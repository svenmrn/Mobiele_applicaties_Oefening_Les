import { Injectable } from '@angular/core';
import { ITask, Task } from '../../datatypes/task';
import { Filter } from '../../datatypes/filter';
import { Label } from 'src/datatypes/label';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // The list of task that will be displayed in the application.
  private taskList: Task[] = [];
  // The id for each new task.
  private id = 0;

  constructor() {
    // Uncomment to generate a collection of demo task for testing the UI.
    for (let i = 0; i < 50; i++) {
      this.taskList.push(new Task({
        name: 'Task ' + i,
        done: this.id % 2 === 0,
        id: this.id
      }));
      this.id++;
    }
  }

  /**
   * Check if a given filter matches a given task.
   *
   * @param task The task to compare with the filter.
   * @param filter The filter that is to be applied to the task.
   * @return True if the filter matches the task, false otherwise.
   */
  private static taskMatchesFilter(task: Task, filter: Filter): boolean {
    if (Filter.all === filter) {
      return true;
    }

    return filter === Filter.completed && task.done ||
      filter === Filter.toDo && ! task.done;
  }

  /**
   * Get a copy of all the tasks.
   *
   * @return A list of all the tasks.
   */
  getAllTasks(): Task[] {
    // A copy of the array is safer to return than a direct reference (return this.taskList).
    // If we simply return a reference instead of a copy we could delete, update or delete a task in a view.
    // In other words, the list could be directly manipulated. This brings with it a increased likelihood of bugs.
    // It is safer to return a copy of the array, because any changes to a task must go through this service.
    // Because all changes go through the service it is possible to implement any validation only once, in the service.
    // Furthermore the service always contains the correct information and is the single source of truth.
    return [... this.taskList];
  }

  /**
   * Delete a task from the task list.
   *
   * @param id The id of the task that is to be deleted.
   */
  deleteTask(id: number): void {
    this.taskList = this.taskList.filter(t => t.id !== id);
  }

  /**
   * Change the status of a task from done to not done or the reverse.
   *
   * @param id The id of the task for which the status must be changed.
   */
  toggleTaskStatus(id: number): void {
    // Note that this approach only works because the array contains OBJECTS.
    // Because the array contains objects the variable task contains a reference, not a copy.
    // If you where to try this approach with an array of integers, booleans or
    // other primitive values, this wouldn't work because the variable would
    // contain a copy and not a reference.
    const task = this.taskList.find(t => t.id === id);
    task.done = !task.done;

    // The following approach works for primitive types.
    // this.taskList
    //   .filter(t => t.id == id)
    //   .forEach(t => t.done = !t.done);
  }

  /**
   * Create a new uncompleted task with a given name.
   *
   * @param name The name of the new task.
   * @param description A longer description for the task.
   * @param deadline The deadline by which the task must be finished. Is optional, defaults to undefined.
   */
  newTask(name: string, description: string , deadline?: string, labels?: Label[]): void {
    // The following uses syntactic sugar for the attributes of the object.
    // {name} is syntactic sugar for {name: name}
    // This only works if the attribute name is the same as the name of the
    // variable that contains the value to be assigned to the attribute.
    this.taskList.push(new Task({
      name,
      id: this.id,
      done: false,
      description,
      deadline,
      labels
    }));
    this.id++;
  }

  /**
   * Update a task with the specified values.
   *
   * @param updatedTask The new values for the task.
   */
  updateTask(updatedTask: ITask): void {
    const task = this.taskList.find(t => t.id === updatedTask.id);
    if (task === undefined) {
      console.error('Trying to update a nonexistent task.');
      return;
    }

    Object.assign(task, updatedTask);
  }

  /**
   * Retrieve a task based on it's id and return it.
   *
   * @param id The task with the matching id, undefined if no task can be found.
   */
  getTask(id: number): Task | undefined {
    const task = this.taskList.find(t => t.id === id);
    // The following returns a copy of the task object for the same reason that
    // a copy of the array was made in the getAllTasks() method.
    return task !== undefined ? new Task({... task}) : undefined;
  }

  /**
   * Filters the list of tasks based on the currently selected filter.
   *
   * @return The tasks that match the currently selected filter.
   */
  getFilteredTasks(filter: Filter): Task[] {
    return this.getAllTasks()
      .filter(t => TaskService.taskMatchesFilter(t, filter));
  }

  // addLabelById(id: number, label: Label): void{
  //   console.log(id);
  //   console.log(label);
  //   const task = this.taskList.find(t=>t.id===id);
  //   task.addLabel(label);
  //   console.log(task);
  // }

  // removeLabelById(id: number, label: Label){
  //   this.taskList.find(t=>t.id===id).removeLabel(label);
  // }
}
