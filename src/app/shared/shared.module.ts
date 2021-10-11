import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TaskItemComponent],
  exports: [
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
