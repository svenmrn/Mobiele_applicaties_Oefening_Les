import { Injectable } from '@angular/core';
import { Color } from 'src/datatypes/color';
import { Label } from 'src/datatypes/label';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  labels: Label[];

  constructor(private taskService: TaskService) {
    this.labels = [];
    this.labels.push(new Label({ name: 'Dringend', color: Color.danger, id: 0 }));
    this.labels.push(new Label({ name: 'Studies', color: Color.primary, id: 1 }));
    this.labels.push(new Label({ name: 'Werk', color: Color.secondary, id: 2 }));
  }

  createLabel(id: number, color: Color, name: string): void {
    this.labels.push(new Label({ id, color, name }));
  }
  deleteLabelById(id: number): void {
    this.labels = this.labels.filter(l => l.id !== id);

    //TODO:
    // DELETE FROM ALL TASKS WITH THIS LABEL
  }
  getLabelById(id: number): Label | undefined {
    const label: Label = this.labels.find(l => l.id === id);
    return label !== undefined ? new Label({...label}) : undefined;
  }
  getAllLabels(): Label[]{
    return [...this.labels];
  }
}
