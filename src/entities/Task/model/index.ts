import React from 'react';
import ReactDOM from 'react-dom';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ITask } from 'shared/model';

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
    isExpanded: true,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
  {
    id: '64545',
    title: 'Write letter',
    description: 'aboba',
    isCompleted: false,
    isFocused: false,
    isExpanded: false,
    timeAll: 0,
    timeSpent: 0,
    timeRemain: 0,
  },
];

class TaskModel {
  tasks: Array<ITask>;

  constructor() {
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

export const taskModel = new TaskModel();
