import React from 'react';
import ReactDOM from 'react-dom';
import { makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IRootModel, ITask, ITasksModel } from 'shared/model';

const tempInitTasks: Array<ITask> = [
  {
    id: '0',
    title: 'Add tasks',
    description: 'description',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '21212',
    title: 'Do stuff',
    description: 'description some bla',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '0000324',
    title: 'Fix up',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '8898989896',
    title: 'Do code',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '22224',
    title: 'Write smth',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '6665',
    title: 'Fix up',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '4252',
    title: 'Fix up',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '3232324',
    title: 'Fix up',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
];

export class TasksModel implements ITasksModel {
  tasks: Array<ITask>;
  taskInCreation: string | null = null;

  constructor(private appModel: IRootModel) {
    this.tasks = tempInitTasks;
    makeAutoObservable(this);
  }

  getTask = (taskId: ITask['id']) => {
    const taskIdx = this.tasks.findIndex((t: ITask) => t.id === taskId);
    if (taskIdx > -1) {
      const task = this.tasks[taskIdx];
      return task;
    }
  };

  toggleTask = (taskId: ITask['id']) => {
    const taskIdx = this.tasks.findIndex((t: ITask) => t.id === taskId);
    if (taskIdx > -1) {
      const task = this.tasks[taskIdx];
      task.isCompleted = !task.isCompleted;

      console.log('model Task. TOGGLE:', task.id, task.isCompleted);
    }
  };

  createTask = () => {
    //check if already creating one
    if (this.taskInCreation) {
      //remove
      this.tasks = this.tasks.filter((t) => t.id !== this.taskInCreation);
    }
    const newTask: ITask = {
      id: Date.now().toString(),
      title: '',
      description: '',
      isCompleted: false,
      isFocused: false,
      isExpanded: false,
      timeAll: 0,
      timeSpent: 0,
      timeRemain: 0,
    };
    runInAction(() => {
      this.taskInCreation = newTask.id;
    });
    this.tasks.push(newTask);
    //expand
    this.expandTask(newTask.id);
  };

  expandTask = (taskId: ITask['id']) => {
    const taskIdx = this.tasks.findIndex((t: ITask) => t.id === taskId);
    if (taskIdx > -1) {
      //expand new task
      const task = this.tasks[taskIdx];
      task.isExpanded = !task.isExpanded;

      //close prev expanded task
      if (!task.isExpanded) return;
      const prevExpandedTask = this.tasks.find(
        (t) => t.isExpanded && t.id !== task.id
      );
      if (prevExpandedTask) prevExpandedTask.isExpanded = false;
    }
  };
}
