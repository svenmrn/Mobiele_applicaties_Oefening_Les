import { Label } from './label';

/**
 * This interface defines the attributes that each task requires.
 */
export interface ITask {
  name: string;
  id: number;
  done: boolean;
  deadline?: string;
  description?: string;
  labels?: Label[];
}

/**
 * This class implements the interface above.
 * In this case, an implementing class is a bit of an overkill, because there is
 * no clear difference between the class and interface.
 * Only use a class when the class requires methods to manipulate the data, as
 * long as there are no methods an interface suffices.
 */
export class Task implements ITask {
  done: boolean;
  id: number;
  name: string;
  deadline?: string;
  description?: string;
  labels: Label[];

  constructor(obj: ITask) {
    // This type of constructor is called a copy constructor and copies every
    // attribute in the parameter (obj) to the newly created instance, i.e. this.
    Object.assign(this, obj);
  }
  addLabel(label: Label): void{
    this.labels.push(label);
  }
  removeLabel(label: Label): void{
    this.labels = this.labels.filter(l=>l !== label);
  }
}
