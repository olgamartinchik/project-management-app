import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface ColumnModel {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

interface Task {
  title: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public columns: ColumnModel[] = [
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b591',
      title: 'Todo 1',
      order: 0,
      tasks: [
        { title: 'do work' },
        { title: 'do something' },
        { title: 'do anything' },
        { title: 'do work' },
        { title: 'do something' },
        { title: 'do anything' },
        { title: 'do something' },
        { title: 'do anything' },
      ],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b592',
      title: 'Todo 2',
      order: 1,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b593',
      title: 'Todo 3',
      order: 2,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b594',
      title: 'Todo 4',
      order: 3,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b595',
      title: 'Todo 5',
      order: 4,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b596',
      title: 'Todo 6',
      order: 5,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
    {
      id: '08cc10f4-1aeb-4cce-9793-9fea8313b597',
      title: 'Todo 7',
      order: 6,
      tasks: [{ title: 'do work' }, { title: 'do something' }, { title: 'do anything' }],
    },
  ];

  public drop(event: CdkDragDrop<string[]>) {
    // присваиваем новый order перемещенному элементу
    this.columns[event.previousIndex].order = event.currentIndex;

    // если элемент сместили к началу, то для всех элементов
    // от текущего индекса до предыдущего увеличиваем значение order
    if (event.previousIndex - event.currentIndex > 0) {
      for (let i = event.currentIndex; i < event.previousIndex; i++) {
        this.columns[i].order = i + 1;
      }
    }

    // если элемент сместили к концу, то для всех элементов
    // от текущего индекса до предыдущего уменьшаем значение order
    if (event.previousIndex - event.currentIndex < 0) {
      for (let i = event.currentIndex; i > event.previousIndex; i--) {
        this.columns[i].order = i - 1;
      }
    }

    console.log(this.columns);

    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
