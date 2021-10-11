import { Component } from '@angular/core';
import { Filter } from 'src/datatypes/filter';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  // The vertical position of the FAB.
  // This is only placed in the logic file in order to demonstrate databinding.
  verticalFabPosition = 'bottom';

  // Tracks whether or not the FAB should be shown to the user.
  fabIsVisible = true;

  // The TaskService that will be used manage the task data.
  // This is only required when the parameter in the constructor isn't marked
  // as either private or public. Marking it as either will automatically create
  // the class variable.
  // taskService: TaskService;

  // The filters are defined in an enum, the enum must first be converted to an
  // array because enums aren't iterable.
  filters = Object.values(Filter);
  selectedFilter = this.filters[0];

  constructor(public taskService: TaskService) {
    // Uncomment the following when not using public/private
    // this.taskService = taskService;

    // Uncomment the following code to demonstrate the power of databinding.
    // The position will switch between bottom and top every 1/4 of a second.
    // This is immediately visible in the UI, thanks to databinding.
    // setInterval(
    //   () => {
    //     this.verticalFabPosition = this.verticalFabPosition === 'bottom' ? 'top' : 'bottom';
    //   },
    //   250
    // );
  }

  /**
   * A handler that ensures that the floating action button is hidden when the
   * user scrolls through the task list.
   */
  logScrollStart(): void {
    this.fabIsVisible = false;
  }

  /**
   * A handler that shows the FAB after scrolling has stopped and 1.5 seconds
   * have passed.
   */
  logScrollEnd(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
